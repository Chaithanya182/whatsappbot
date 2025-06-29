# TeluguPickleBot WhatsApp Chatbot

## Overview

TeluguPickleBot is a Node.js-based WhatsApp chatbot serving as an automated customer service solution for **Alekhyaa Chitti Pickles**, an authentic Andhra pickle business based in Rajahmundry, East Godavari, AP. The bot handles customer inquiries, provides authentic product information from their real catalog, processes orders, and manages user sessions while integrating with the Gupshup WhatsApp Business API. The application supports both Telugu and English messages and features a comprehensive catalog of 17+ authentic pickle varieties including vegetarian, non-vegetarian, and traditional spice powders.

## System Architecture

The application follows a modular architecture pattern with the following layers:

- **API Layer**: Express.js server handling HTTP requests and webhooks
- **Business Logic Layer**: Utility classes for different functionalities (message processing, recommendations, abuse detection)
- **Data Layer**: Static JSON files containing product information and response templates
- **External Integration Layer**: Gupshup WhatsApp API for message sending and receiving

The architecture emphasizes separation of concerns, making the codebase maintainable and extensible.

## Key Components

### Core Application (index.js)
- **Express Server**: Handles incoming webhook requests from Gupshup
- **Rate Limiting**: Implements in-memory rate limiting to prevent abuse (10 requests per minute per user)
- **Service Orchestration**: Coordinates between different utility services
- **Error Handling**: Comprehensive error handling for API calls and message processing

### Utility Services

#### SessionManager (utils/sessionManager.js)
- **Purpose**: Manages user sessions and conversation state
- **Features**: 
  - Tracks user preferences and conversation history
  - Manages product interests and order history
  - Handles user blocking and offense tracking
  - Automatic cleanup of inactive sessions
- **Storage**: In-memory storage with periodic cleanup

#### MessageProcessor (utils/messageProcessor.js)
- **Purpose**: Processes incoming messages and determines appropriate responses
- **Features**:
  - Intent detection using keyword matching
  - Multi-language support (Telugu and English)
  - Product name recognition with variations
  - Context-aware response generation

#### AbuseDetector (utils/abuseDetector.js)
- **Purpose**: Detects and prevents abusive or spam messages
- **Features**:
  - Multi-language profanity filtering
  - Spam pattern detection (repeated characters, excessive caps)
  - Statistical tracking of abuse incidents
  - Graduated response system

#### RecommendationEngine (utils/recommendationEngine.js)
- **Purpose**: Provides personalized product recommendations
- **Features**:
  - Complementary product suggestions
  - Interest-based recommendations
  - Order history consideration
  - Popular product fallbacks

### Data Components

#### Products (data/products.js)
- **Authentic Alekhyaa Chitti Pickles catalog** with 17+ real products
- **Vegetarian Pickles**: Tomato (₹250), Gongura (₹250), Aavakaya (₹250), Maagaya (₹250)
- **Chicken Pickles**: Boneless (₹429), Tokku (₹549), Bone (₹349), Gongura Chicken (₹609), Mango Chicken (₹609)
- **Prawn Pickles**: Regular (₹579), Vein-Free (₹599)
- **Mutton Pickle**: Premium (₹679 with 10% OFF - Code: SAVE10)
- **HomeMade Spices & Podis**: 5 varieties including Kura Karam, Karappodi varieties
- Real business information: Contact (+91 7305607487), Email (contact@chittipickles.in), Location (Rajahmundry, AP)
- Customer statistics: 12,000+ happy customers, 21,000+ orders fulfilled

#### Responses (data/responses.js)
- Business-specific responses featuring **Alekhyaa Chitti Pickles** branding
- Authentic contact information and business details
- Multi-language Telugu-English responses with emoji support
- Real promotional offers (Free shipping above ₹2500, Mutton 10% OFF)
- Contextual responses based on user state and intent

## Data Flow

1. **Incoming Message**: Gupshup webhook sends message to `/webhook` endpoint
2. **Rate Limiting**: Check if user has exceeded rate limits
3. **Session Management**: Retrieve or create user session
4. **Abuse Detection**: Screen message for inappropriate content
5. **Message Processing**: Analyze intent and extract product mentions
6. **Response Generation**: Generate appropriate response based on context
7. **Recommendations**: Add personalized product suggestions if relevant
8. **Session Update**: Update user session with new interaction data
9. **Message Sending**: Send response via Gupshup WhatsApp API

## External Dependencies

### Gupshup WhatsApp Business API
- **Purpose**: WhatsApp message sending and receiving
- **Integration**: REST API calls for message delivery
- **Authentication**: API key-based authentication
- **Rate Limits**: Managed by provider

### Node.js Packages
- **Express**: Web framework for handling HTTP requests
- **Axios**: HTTP client for external API calls
- **Built-in Modules**: No additional database dependencies (uses in-memory storage)

## Deployment Strategy

### Environment Configuration
- **GUPSHUP_API_KEY**: API key for WhatsApp integration
- **SOURCE_NUMBER**: WhatsApp business number for message sending
- **PORT**: Server port (defaults to 5000)

### Hosting Requirements
- Node.js runtime environment
- Public HTTPS endpoint for webhook reception
- Minimal resource requirements (suitable for Replit deployment)

### Scalability Considerations
- In-memory storage limits horizontal scaling
- Session data is not persistent across restarts
- Rate limiting is per-instance, not distributed

## Changelog
- June 29, 2025: Initial setup with enhanced features
- June 29, 2025: **Major Update** - Integrated authentic Alekhyaa Chitti Pickles business data
  - Added real product catalog with 17+ authentic items (Veg/Non-Veg/Spices)
  - Updated all responses with genuine business information
  - Added real contact details and business location
  - Implemented special offers (Mutton 10% OFF, Free shipping ₹2500+)
  - Enhanced message processor with category-specific responses
  - Updated Gupshup API key configuration

## User Preferences

Preferred communication style: Simple, everyday language.