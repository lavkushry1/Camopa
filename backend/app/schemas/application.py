from pydantic import BaseModel, EmailStr, constr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ApplicationStatus(str, Enum):
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    PAYMENT_PENDING = "PAYMENT_PENDING"
    PAYMENT_VERIFIED = "PAYMENT_VERIFIED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class ApplicationBase(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: constr(min_length=10, max_length=15)
    businessName: str
    businessType: str
    gstNumber: Optional[str] = None
    panNumber: str
    yearsInBusiness: int
    address: str
    city: str
    state: str
    pincode: str
    area: str
    investmentCapacity: Optional[str] = None
    existingBusiness: Optional[str] = None
    reasonForInterest: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus
    rejectionReason: Optional[str] = None
    paymentAmount: Optional[float] = None

class ApplicationResponse(ApplicationBase):
    id: int
    trackingId: str
    status: ApplicationStatus
    rejectionReason: Optional[str] = None
    paymentAmount: Optional[float] = None
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True
