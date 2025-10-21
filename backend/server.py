from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============= MODELS =============

# Gallery Models
class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str  # Heritage, Festivals, Nature, People, Events, Food, etc.
    image_url: str
    description: Optional[str] = None
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImageCreate(BaseModel):
    title: str
    category: str
    image_url: str
    description: Optional[str] = None

# News Models
class NewsItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    image_url: Optional[str] = None
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsItemCreate(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None

# Events Models
class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    event_date: str  # Store as ISO date string
    location: str
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EventCreate(BaseModel):
    title: str
    description: str
    event_date: str
    location: str
    image_url: Optional[str] = None

# Contact Form Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Community Stories Models
class CommunityStory(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    author_name: str
    title: str
    story: str
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CommunityStoryCreate(BaseModel):
    author_name: str
    title: str
    story: str
    image_url: Optional[str] = None

# Local Business Models
class LocalBusiness(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # Restaurant, Shop, Service, etc.
    description: str
    contact: Optional[str] = None
    address: Optional[str] = None
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LocalBusinessCreate(BaseModel):
    name: str
    category: str
    description: str
    contact: Optional[str] = None
    address: Optional[str] = None
    image_url: Optional[str] = None


# ============= API ROUTES =============

@api_router.get("/")
async def root():
    return {"message": "Welcome to I Love Shrigonda API"}

# Gallery Routes
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images(category: Optional[str] = None):
    query = {"category": category} if category else {}
    images = await db.gallery.find(query, {"_id": 0}).sort("uploaded_at", -1).to_list(1000)
    
    for img in images:
        if isinstance(img.get('uploaded_at'), str):
            img['uploaded_at'] = datetime.fromisoformat(img['uploaded_at'])
    
    return images

@api_router.post("/gallery", response_model=GalleryImage)
async def create_gallery_image(image: GalleryImageCreate):
    image_obj = GalleryImage(**image.model_dump())
    doc = image_obj.model_dump()
    doc['uploaded_at'] = doc['uploaded_at'].isoformat()
    
    await db.gallery.insert_one(doc)
    return image_obj

# News Routes
@api_router.get("/news", response_model=List[NewsItem])
async def get_news():
    news = await db.news.find({}, {"_id": 0}).sort("published_at", -1).to_list(100)
    
    for item in news:
        if isinstance(item.get('published_at'), str):
            item['published_at'] = datetime.fromisoformat(item['published_at'])
    
    return news

@api_router.post("/news", response_model=NewsItem)
async def create_news(news: NewsItemCreate):
    news_obj = NewsItem(**news.model_dump())
    doc = news_obj.model_dump()
    doc['published_at'] = doc['published_at'].isoformat()
    
    await db.news.insert_one(doc)
    return news_obj

# Events Routes
@api_router.get("/events", response_model=List[Event])
async def get_events():
    events = await db.events.find({}, {"_id": 0}).sort("event_date", 1).to_list(100)
    
    for event in events:
        if isinstance(event.get('created_at'), str):
            event['created_at'] = datetime.fromisoformat(event['created_at'])
    
    return events

@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    event_obj = Event(**event.model_dump())
    doc = event_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.events.insert_one(doc)
    return event_obj

# Contact Routes
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(message: ContactMessageCreate):
    contact_obj = ContactMessage(**message.model_dump())
    doc = contact_obj.model_dump()
    doc['submitted_at'] = doc['submitted_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(1000)
    
    for contact in contacts:
        if isinstance(contact.get('submitted_at'), str):
            contact['submitted_at'] = datetime.fromisoformat(contact['submitted_at'])
    
    return contacts

# Community Stories Routes
@api_router.get("/stories", response_model=List[CommunityStory])
async def get_stories():
    stories = await db.stories.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for story in stories:
        if isinstance(story.get('created_at'), str):
            story['created_at'] = datetime.fromisoformat(story['created_at'])
    
    return stories

@api_router.post("/stories", response_model=CommunityStory)
async def create_story(story: CommunityStoryCreate):
    story_obj = CommunityStory(**story.model_dump())
    doc = story_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.stories.insert_one(doc)
    return story_obj

# Local Business Routes
@api_router.get("/businesses", response_model=List[LocalBusiness])
async def get_businesses(category: Optional[str] = None):
    query = {"category": category} if category else {}
    businesses = await db.businesses.find(query, {"_id": 0}).sort("name", 1).to_list(100)
    
    for business in businesses:
        if isinstance(business.get('created_at'), str):
            business['created_at'] = datetime.fromisoformat(business['created_at'])
    
    return businesses

@api_router.post("/businesses", response_model=LocalBusiness)
async def create_business(business: LocalBusinessCreate):
    business_obj = LocalBusiness(**business.model_dump())
    doc = business_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.businesses.insert_one(doc)
    return business_obj


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()