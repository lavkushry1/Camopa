from sqlalchemy import Column, Integer, String, Float, Text, Enum, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from app.schemas.application import ApplicationStatus
from app.models.base import BaseModel

class Application(BaseModel):
    """Application model for dealership applications"""
    __tablename__ = "applications"
    
    tracking_id = Column(String(15), unique=True, nullable=False, index=True)
    status = Column(String, nullable=False, default=ApplicationStatus.SUBMITTED)
    
    # Personal Information
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    
    # Business Details
    business_name = Column(String(100), nullable=False)
    business_type = Column(String(50), nullable=False)
    gst_number = Column(String(15), nullable=True)
    pan_number = Column(String(10), nullable=False)
    years_in_business = Column(Integer, nullable=False)
    
    # Location Details
    address = Column(Text, nullable=False)
    city = Column(String(50), nullable=False)
    state = Column(String(50), nullable=False)
    pincode = Column(String(10), nullable=False)
    area = Column(String(50), nullable=False)
    
    # Additional Information
    investment_capacity = Column(String(50), nullable=True)
    existing_business = Column(Text, nullable=True)
    reason_for_interest = Column(Text, nullable=True)
    
    # Admin fields
    rejection_reason = Column(Text, nullable=True)
    payment_amount = Column(Float, nullable=True, default=50000.00)
    approval_letter_url = Column(String(255), nullable=True)
