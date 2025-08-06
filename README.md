# City Pulse - Event Tracker

City Pulse is a React Native mobile application built using Expo. It allows users to explore local events using the Ticketmaster Discovery API, manage favorites, and optionally log in or sign up using Firebase Authentication. The app is designed with clean UI, RTL (Right-To-Left) support for Arabic, and persistent storage using Firebase Firestore or local storage for guest users.

## Features

Explore local events by location and keyword

User authentication using Firebase (Email & Password)

Support for guest users without login

Save favorite events (persisted via Firebase or locally)

Multi-language support (English and Arabic)

RTL layout switch based on language-Not Completed

Bottom Tab Navigation and Stack Navigation with Expo

Pull to refresh, pagination, and custom theme support

Profile screen option to update the user informations (name and email)

Splash screen and Clean UI


## Tech Stack

React Native (Expo)

Typescript

Firebase (Auth + Firestore)

Redux Toolkit

React Navigation

AsyncStorage

i18next for translations

Ticketmaster Discovery API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SherinAnees/city-pulse.git
   cd city-pulse
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Add Environmen Variables:

   This project uses `constants/index.ts` to store environment values. You must replace the placeholder values with your actual API keys and Firebase configuration.


   ```constants\index.ts
   export const TICKETMASTER_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
    export const TICKETMASTER_API_KEY = '';
    export const TICKETMASTER_API_FAV_BY_ID="";
    export const FIREBASE_API_KEY=""
    export const FIREBASE_AUTH_DOMAIN=""
    export const FIREBASE_PROJECT_ID=""
    export const FIREBASE_STORAGE_BUCKET=""
    export const FIREBASE_MESSAGING_SENDER_ID=""
    export const FIREBASE_APP_ID=""
   ```

5. Running the Project:

  To start the app locally on an emulator or physical device:

   ```bash
   npx expo start
  
   ```

Scan the QR code using the Expo Go app or run it on an emulator via the terminal.

## Assumptions Made

-Guest users’ favorites are stored in AsyncStorage; authenticated users’ favorites are synced with Firestore.

-No backend was used; the app fetches all event data from the public Ticketmaster Discovery API.

-The app uses `constants/index.ts` instead of `.env ` due to Expo limitations with .env files in bare React Native setups.
 ## Bonus Implementations

 ✅ Firebase Authentication (Email/Password)

✅ Firestore integration for storing favorite events

✅ RTL support for Arabic with react-i18next(limited)

✅ Reusable hooks for auth and event logic

##  Run on Web (optional)

If you want to test via browser (limited support) :

```bash

npx expo start --web

```
## Screenshots

### Splash screen

![Splash screen](assets/screenshots/splash.jpg)

### Login Screen

![Login Screen](public/screenshots/login.jpg)

### Signup screen

![Signup Screen](public/screenshots/signup.jpg)

### Events screen-with search and Language Toggle

![Event Screen-user](public/screenshots/page%20not%20found.png)
![Event Screen-guest](public/screenshots/page%20not%20found.png)

![Event screen-search](public/screenshots/page%20not%20found.png)
![Language-toggle](public/screenshots/page%20not%20found.png)


### Event Details screen

![Event details](public/screenshots/page%20not%20found.png)

### Favourite screen

![Fav screen-user](public/screenshots/page%20not%20found.png)
![Fav screen-guest](public/screenshots/page%20not%20found.png)

### Profile screen

![Profile screen](public/screenshots/page%20not%20found.png)
## Conclusion

City Pulse demonstrates a complete React Native application architecture with real-world features such as API integration, authentication, state management, theming, and localization. It highlights best practices in modular design, RTL support, and scalable code structure. This project reflects strong proficiency in React Native, Firebase, and mobile UI/UX principles.

## Contact

For any questions or inquiries, please contact:

- Sherin - [csherin111@gmail.com](mailto:csherin111@gmail.com)
- GitHub: [sherinAnees](https://github.com/sherinAnees)
