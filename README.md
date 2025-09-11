# QuickShow - ระบบจองตั้วหนังออนไลน์

QuickShow เป็นเว็บแอปพลิเคชันสำหรับจองตั๋วหนังออนไลน์ที่สร้างด้วย React, Node.js, Express, MongoDB และ Clerk สำหรับการจัดการผู้ใช้

## ✨ ฟีเจอร์หลัก

### สำหรับผู้ใช้ทั่วไป
- 🎬 **ดูรายการหนังที่กำลังฉาย** - เรียกดูหนังล่าสุดจาก TMDB API
- 🎫 **จองตั๋วหนัง** - เลือกที่นั่ง วันที่ และเวลาการฉาย
- 💳 **ชำระเงินออนไลน์** - ผ่านระบบ Stripe
- 📧 **อีเมลยืนยัน** - รับอีเมลยืนยันการจองอัตโนมัติ
- ❤️ **รายการโปรด** - เพิ่มหนังที่ชอบเข้ารายการโปรด
- 📱 **รองรับ Mobile** - ใช้งานได้ทุกอุปกรณ์
- 📋 **ประวัติการจอง** - ดูประวัติการจองทั้งหมด

### สำหรับแอดมิน
- 📊 **แดชบอร์ด** - สถิติการจอง รายได้ และข้อมูลผู้ใช้
- 🎭 **จัดการการแสดง** - เพิ่มและจัดการรอบการแสดง
- 📑 **จัดการการจอง** - ดูรายการการจองทั้งหมด
- 🔐 **ควบคุมการเข้าถึง** - เฉพาะแอดมินเท่านั้น

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 19** - User Interface
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router DOM** - Navigation
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **React Player** - Video Player

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Stripe** - Payment Processing
- **Nodemailer** - Email Service
- **Inngest** - Background Jobs

### Authentication & Services
- **Clerk** - User Authentication
- **TMDB API** - Movie Database
- **Brevo/Sendinblue** - Email Service

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น
- Node.js (v18 หรือสูงกว่า)
- MongoDB
- บัญชี Clerk
- บัญชี Stripe
- API Key ของ TMDB
- บัญชี Brevo สำหรับอีเมล

### 1. Clone Repository
```bash
git clone <repository-url>
cd quickshow
```

### 2. ติดตั้ง Dependencies

#### สำหรับ Server
```bash
cd server
npm install
```

#### สำหรับ Client
```bash
cd client
npm install
```

### 3. ตั้งค่า Environment Variables

#### Server (.env)
```env
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
TMDB_API_KEY=your_tmdb_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_KEY=your_stripe_webhook_secret
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
SENDER_EMAIL=your_sender_email
```

#### Client (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CURRENCY=$
```

### 4. รันแอปพลิเคชัน

#### รัน Server
```bash
cd server
npm run server
```

#### รัน Client
```bash
cd client
npm run dev
```

แอปจะทำงานที่:
- **Client**: http://localhost:5173
- **Server**: http://localhost:3000

## 📂 โครงสร้างโปรเจ็กต์

```
quickshow/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── pages/          # หน้าเว็บต่างๆ
│   │   ├── context/        # Context API
│   │   ├── lib/            # Utility Functions
│   │   └── assets/         # Static Assets
│   └── package.json
├── server/                 # Node.js Backend
│   ├── controllers/        # Route Controllers
│   ├── models/            # Database Models
│   ├── routes/            # API Routes
│   ├── middleware/        # Custom Middleware
│   ├── configs/           # Configuration Files
│   ├── inngest/           # Background Jobs
│   └── package.json
└── README.md
```

## 🔧 คำสั่ง Scripts

### Client
```bash
npm run dev      # รัน development server
npm run build    # สร้าง production build
npm run preview  # Preview production build
npm run lint     # ตรวจสอบ code quality
```

### Server
```bash
npm run server   # รัน development server (nodemon)
npm start        # รัน production server
```

## 🚀 การ Deploy

### Frontend (Vercel)
1. Push โค้ดไปยัง GitHub
2. เชื่อมต่อ repository กับ Vercel
3. ตั้งค่า environment variables
4. Deploy

### Backend (Vercel/Railway/Heroku)
1. ตั้งค่า environment variables
2. Deploy ตาม platform ที่เลือก
3. อัพเดต VITE_BASE_URL ใน client

## 📋 API Routes

### Public Routes
- `GET /api/show/all` - ดูหนังทั้งหมด
- `GET /api/show/:movieId` - ดูข้อมูลหนัง
- `GET /api/booking/seats/:showId` - ดูที่นั่งที่ถูกจอง

### Protected Routes (ต้อง Login)
- `POST /api/booking/create` - สร้างการจอง
- `GET /api/user/bookings` - ดูประวัติการจอง
- `POST /api/user/update-favorites` - อัพเดตรายการโปรด

### Admin Routes
- `GET /api/admin/dashboard` - ข้อมูลแดชบอร์ด
- `POST /api/show/add` - เพิ่มการแสดง
- `GET /api/admin/all-bookings` - ดูการจองทั้งหมด

## 🎨 UI/UX Features

- **Dark Theme** - การออกแบบโทนมืดสวยงาม
- **Responsive Design** - ใช้งานได้ทุกขนาดหน้าจอ
- **Blur Effects** - เอฟเฟกต์ blur สวยงาม
- **Smooth Animations** - แอนิเมชันลื่น
- **Toast Notifications** - การแจ้งเตือนแบบ toast

## 🔐 การจัดการผู้ใช้

- **Clerk Authentication** - การล็อกอิน/สมัครสมาชิกที่ปลอดภัย
- **Role-based Access** - การควบคุมการเข้าถึงตามบทบาท
- **User Profile Management** - จัดการข้อมูลผู้ใช้

## 📧 ระบบอีเมล

- **Booking Confirmation** - อีเมลยืนยันการจอง
- **Show Reminders** - อีเมลเตือนก่อนการแสดง
- **New Show Notifications** - แจ้งเตือนหนังใหม่

## 💳 ระบบการชำระเงิน

- **Stripe Integration** - ชำระเงินปลอดภัย
- **Webhook Handling** - จัดการ payment status
- **Automatic Confirmation** - ยืนยันการชำระเงินอัตโนมัติ

## ⚙️ Background Jobs (Inngest)

- **User Sync** - ซิงค์ข้อมูลผู้ใช้จาก Clerk
- **Seat Release** - ปล่อยที่นั่งหากไม่ชำระเงิน
- **Email Notifications** - ส่งอีเมลอัตโนมัติ
- **Show Reminders** - เตือนการแสดงล่วงหน้า

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **ไม่สามารถเชื่อมต่อ Database**
   - ตรวจสอบ MONGODB_URI
   - ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต

2. **Clerk Authentication Error**
   - ตรวจสอบ API Keys ของ Clerk
   - ตรวจสอบ domain settings

3. **Stripe Payment Issues**
   - ตรวจสอบ Stripe API Keys
   - ตรวจสอบ webhook endpoints

## 🤝 การมีส่วนร่วม

1. Fork โปรเจ็กต์
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request



## 🙏 Credits

โปรเจ็กต์นี้สร้างขึ้นโดยอิงจากการสอนจากวิดีโอ: [Movie Ticket Booking System Tutorial](https://youtu.be/Pez37wmUaQM?si=OpgotqraJ_Uw80jS)

---

