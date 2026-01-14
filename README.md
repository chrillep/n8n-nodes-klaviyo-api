# n8n-nodes-klaviyo

This is an n8n community node for [Klaviyo](https://www.klaviyo.com/), a marketing automation platform that helps businesses manage customer relationships through email, SMS, and other channels.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm Installation

```bash
npm install n8n-nodes-klaviyo-api
```

### Manual Installation

To install this node manually, you'll need to:

1. Clone or download this repository
2. Run `npm install` in the package directory
3. Run `npm run build`
4. Copy the `dist` folder to your n8n custom nodes directory

## Operations

This node supports the following Klaviyo resources and operations:

### Account
- **Get** - Get account information
- **Get Many** - Get all accounts

### Campaign
- **Create** - Create a new campaign
- **Delete** - Delete a campaign
- **Get** - Get a campaign by ID
- **Get Many** - Get multiple campaigns
- **Send** - Send a campaign
- **Update** - Update a campaign

### Coupon
- **Create** - Create a new coupon
- **Delete** - Delete a coupon
- **Get** - Get a coupon by ID
- **Get Many** - Get multiple coupons
- **Update** - Update a coupon

### Event
- **Create** - Track/create a new event for a profile
- **Get** - Get an event by ID
- **Get Many** - Get multiple events with filtering

### Flow
- **Get** - Get a flow by ID
- **Get Many** - Get multiple flows
- **Update Status** - Update flow status (draft/manual/live)

### Image
- **Get** - Get an image by ID
- **Get Many** - Get multiple images

### List
- **Add Profiles** - Add profiles to a list
- **Create** - Create a new list
- **Delete** - Delete a list
- **Get** - Get a list by ID
- **Get Many** - Get multiple lists
- **Get Profiles** - Get profiles in a list
- **Remove Profiles** - Remove profiles from a list
- **Update** - Update a list name

### Metric
- **Get** - Get a metric by ID
- **Get Many** - Get multiple metrics

### Profile
- **Create** - Create a new profile
- **Create or Update** - Create a new profile or update if it already exists
- **Get** - Get a profile by ID
- **Get Many** - Get multiple profiles with filtering and pagination
- **Subscribe** - Subscribe profiles to a list (email/SMS marketing)
- **Suppress** - Suppress profiles from email marketing
- **Unsubscribe** - Unsubscribe profiles from marketing
- **Unsuppress** - Unsuppress profiles
- **Update** - Update an existing profile

### Segment
- **Get** - Get a segment by ID
- **Get Many** - Get multiple segments
- **Get Profiles** - Get profiles in a segment

### Tag
- **Get** - Get a tag by ID
- **Get Many** - Get multiple tags

### Template
- **Get** - Get a template by ID
- **Get Many** - Get multiple templates

## Credentials

You need a Klaviyo API key to use this node. To get your API key:

1. Log in to your [Klaviyo account](https://www.klaviyo.com/login)
2. Go to **Settings** > **API Keys**
3. Click **Create Private API Key**
4. Give your key a name and select the appropriate scopes
5. Copy the generated API key

### Required API Scopes

Depending on the operations you want to perform, you'll need different API scopes:

- **Account**: `accounts:read`
- **Campaigns**: `campaigns:read`, `campaigns:write`
- **Coupons**: `coupons:read`, `coupons:write`
- **Events**: `events:read`, `events:write`
- **Flows**: `flows:read`, `flows:write`
- **Images**: `images:read`, `images:write`
- **Lists**: `lists:read`, `lists:write`
- **Metrics**: `metrics:read`
- **Profiles**: `profiles:read`, `profiles:write`
- **Segments**: `segments:read`
- **Tags**: `tags:read`, `tags:write`
- **Templates**: `templates:read`

## Compatibility

This node is compatible with n8n 1.0+. It has been tested with Node.js 20+ and n8n latest versions.

## Usage

### Basic Profile Operations

1. **Create a Profile**: Use the Profile resource with the Create operation to add a new contact to Klaviyo
2. **Update a Profile**: Use the Update operation to modify existing profile information
3. **List Profiles**: Use Get Many to retrieve all profiles with optional filtering

### Managing Lists

1. **Create a List**: Use the List resource to create a new contact list
2. **Add Profiles to List**: Use the Add Profiles operation to bulk add contacts
3. **Get List Members**: Use Get Profiles to retrieve all contacts in a specific list

### Tracking Events

1. **Track Events**: Use the Event resource Create operation to log customer actions
2. **Query Events**: Use Get Many to retrieve events with filters

### Campaign Management

1. **Create Campaign**: Draft a new email or SMS campaign
2. **Send Campaign**: Trigger immediate send of a draft campaign
3. **Get Campaign Status**: Monitor campaign performance

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Klaviyo API Documentation](https://developers.klaviyo.com/)
* [Klaviyo OpenAPI Specification](https://github.com/klaviyo/openapi)

## Version history

### v0.1.0
- Initial release
- Support for 12 core resources: Account, Campaign, Coupon, Event, Flow, Image, List, Metric, Profile, Segment, Tag, Template
- API Key authentication with revision header (2025-10-15)
- Full CRUD operations for most resources
- Pagination support with cursor-based navigation
- Filter expression support for advanced queries
