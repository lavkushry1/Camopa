from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime
from app.database import ApplicationStatus, PaymentStatus

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_admin: bool
    created_at: datetime

    class Config:
        orm_mode = True

# Application schemas
class ApplicationBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    business_name: str
    business_type: str
    registration_number: str
    street_address: str
    city: str
    state: str
    postal_code: str
    area_of_operation: str
    expected_monthly_sales: float
    previous_experience: str
    references: str

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    status: Optional[ApplicationStatus] = None
    admin_notes: Optional[str] = None

class ApplicationResponse(ApplicationBase):
    id: int
    tracking_id: str
    status: ApplicationStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class ApplicationDetailResponse(ApplicationResponse):
    admin_notes: Optional[str] = None
    payments: List["PaymentResponse"] = []
    approval_letter: Optional["ApprovalLetterResponse"] = None
    status_updates: List["StatusUpdateResponse"] = []

    class Config:
        orm_mode = True

# Payment schemas
class PaymentBase(BaseModel):
    amount: float
    payment_method: str = "UPI"
    upi_reference: Optional[str] = None

class PaymentCreate(PaymentBase):
    application_id: int

class PaymentUpdate(BaseModel):
    status: PaymentStatus
    transaction_id: Optional[str] = None
    payment_date: Optional[datetime] = None

class PaymentResponse(PaymentBase):
    id: int
    application_id: int
    transaction_id: Optional[str] = None
    status: PaymentStatus
    payment_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        orm_mode = True

# Approval Letter schemas
class ApprovalLetterBase(BaseModel):
    application_id: int

class ApprovalLetterCreate(ApprovalLetterBase):
    dealership_id: str
    file_path: str

class ApprovalLetterResponse(ApprovalLetterBase):
    id: int
    dealership_id: str
    file_path: str
    issued_date: datetime

    class Config:
        orm_mode = True

# Status Update schemas
class StatusUpdateBase(BaseModel):
    application_id: int
    previous_status: ApplicationStatus
    new_status: ApplicationStatus
    notes: Optional[str] = None
    updated_by: int

class StatusUpdateCreate(StatusUpdateBase):
    pass

class StatusUpdateResponse(StatusUpdateBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Support Request schemas
class SupportRequestBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class SupportRequestCreate(SupportRequestBase):
    pass

class SupportRequestUpdate(BaseModel):
    is_resolved: bool

class SupportRequestResponse(SupportRequestBase):
    id: int
    is_resolved: bool
    created_at: datetime

    class Config:
        orm_mode = True

# Update forward references
ApplicationDetailResponse.update_forward_refs()
