from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from app.schemas.application import (
    ApplicationCreate, 
    ApplicationResponse, 
    ApplicationStatus,
    ApplicationStatusUpdate
)
from app.models.application import Application
from app.database import get_db

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    """Create a new dealership application"""
    
    # Generate tracking ID
    tracking_id = f"CMPA-{uuid.uuid4().hex[:8].upper()}"
    
    db_application = Application(
        tracking_id=tracking_id,
        status=ApplicationStatus.SUBMITTED,
        first_name=application.firstName,
        last_name=application.lastName,
        email=application.email,
        phone=application.phone,
        business_name=application.businessName,
        business_type=application.businessType,
        gst_number=application.gstNumber,
        pan_number=application.panNumber,
        years_in_business=application.yearsInBusiness,
        address=application.address,
        city=application.city,
        state=application.state,
        pincode=application.pincode,
        area=application.area,
        investment_capacity=application.investmentCapacity,
        existing_business=application.existingBusiness,
        reason_for_interest=application.reasonForInterest
    )
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    return ApplicationResponse(
        id=db_application.id,
        trackingId=db_application.tracking_id,
        status=db_application.status,
        firstName=db_application.first_name,
        lastName=db_application.last_name,
        email=db_application.email,
        phone=db_application.phone,
        businessName=db_application.business_name,
        businessType=db_application.business_type,
        gstNumber=db_application.gst_number,
        panNumber=db_application.pan_number,
        yearsInBusiness=db_application.years_in_business,
        address=db_application.address,
        city=db_application.city,
        state=db_application.state,
        pincode=db_application.pincode,
        area=db_application.area,
        investmentCapacity=db_application.investment_capacity,
        existingBusiness=db_application.existing_business,
        reasonForInterest=db_application.reason_for_interest,
        createdAt=db_application.created_at,
        updatedAt=db_application.updated_at
    )

@router.get("/track/{tracking_id}", response_model=ApplicationResponse)
def track_application(tracking_id: str, db: Session = Depends(get_db)):
    """Track an application using tracking ID"""
    
    application = db.query(Application).filter(Application.tracking_id == tracking_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found. Please check your tracking ID."
        )
    
    return ApplicationResponse(
        id=application.id,
        trackingId=application.tracking_id,
        status=application.status,
        firstName=application.first_name,
        lastName=application.last_name,
        email=application.email,
        phone=application.phone,
        businessName=application.business_name,
        businessType=application.business_type,
        gstNumber=application.gst_number,
        panNumber=application.pan_number,
        yearsInBusiness=application.years_in_business,
        address=application.address,
        city=application.city,
        state=application.state,
        pincode=application.pincode,
        area=application.area,
        investmentCapacity=application.investment_capacity,
        existingBusiness=application.existing_business,
        reasonForInterest=application.reason_for_interest,
        rejectionReason=application.rejection_reason,
        paymentAmount=application.payment_amount,
        createdAt=application.created_at,
        updatedAt=application.updated_at
    )
