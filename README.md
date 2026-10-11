# WEB103 Project 4 — SmartSwitch Configurator

Submitted by: **Jean Pierre Joseph**

**About this web app:** SmartSwitch Configurator is a full-stack web application that allows users to customize smart wall switches. Users can select the switch finish, number of channels, connectivity type, and energy monitoring capability. The application provides a live visual preview, dynamically calculates the price, validates incompatible configurations, and allows users to create, view, edit, and delete saved switches.

**Time spent:** TBD hours

## Required Features

The following **required** functionality is completed:

- [x] The web app uses React to display data retrieved from the API.
- [x] The web app connects to a PostgreSQL database with a structured `custom_items` table.
  - [ ] The video walkthrough demonstrates the PostgreSQL database on the Render dashboard.
  - [ ] The video walkthrough demonstrates the database records using `SELECT * FROM custom_items;`.
- [x] Users can view multiple customizable features of a smart wall switch, including finish, channels, connectivity, and energy monitoring.
- [x] Each customizable feature provides multiple options, where applicable.
- [x] The switch's visual preview updates dynamically when users change its configuration.
- [x] The total price updates automatically based on the selected options.
- [x] The visual interface changes in response to the selected switch finish and number of channels.
- [x] Users can save valid switch configurations to the PostgreSQL database.
- [x] Invalid or incompatible configurations display appropriate error messages and are rejected.
- [x] Users can view all saved switches.
- [x] Users can edit previously saved switches.
- [x] Users can delete saved switches.
- [x] Users can update or delete saved switches from their detail pages.

## Optional Features

- [x] Incompatible feature combinations are identified before form submission, allowing users to correct their selections.

## Additional Features

- [x] Custom SVG switch previews supporting multiple finishes and channel layouts.
- [x] Responsive interface with dark-blue glassmorphism styling and cyan accents.
- [x] Reusable configuration form for creating and editing switches.
- [x] Server-side price calculation to maintain consistent saved prices.
- [x] PostgreSQL constraints to protect data integrity.
- [x] Error handling for failed API requests and invalid input.
- [x] Database timestamps for saved configurations.

## Technologies Used

**Frontend:** React, JavaScript, HTML, CSS, Vite, React Router, Pico CSS

**Backend:** Node.js, Express.js

**Database:** PostgreSQL hosted on Render

**Database integration:** `pg` (node-postgres)

**API architecture:** RESTful API supporting CRUD operations

## Video Walkthrough

The video walkthrough will demonstrate:

1. Creating a smart wall switch with different customization options.
2. Updating the live preview and dynamically calculated price.
3. Testing an incompatible configuration and observing the validation message.
4. Saving a valid configuration.
5. Viewing all saved switches.
6. Opening a switch's details.
7. Editing and deleting saved switches.
8. Viewing the PostgreSQL database on Render.
9. Running `SELECT * FROM custom_items;` to demonstrate saved database records.

**Video/GIF:** To be added.

## Notes

This project provided practical experience building a full-stack application with React, Express, and PostgreSQL.

One important challenge was keeping the frontend configuration options and pricing consistent with the backend validation rules. The application addresses this by validating submitted configurations and calculating saved prices on the server.

Another challenge was designing a live visual preview that responds to different finishes and channel counts. A reusable SVG-based switch preview was developed to represent the selected configuration.

The project also involved configuring a remotely hosted PostgreSQL database, implementing CRUD operations, improving error handling, and designing a responsive user interface.

## License

Copyright 2026 Jean Pierre Joseph

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
