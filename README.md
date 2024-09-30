# Outfitory.Ai
![file](https://github.com/user-attachments/assets/f395e47d-fc3b-467f-b115-dbaf8340bb9d)


Outfitory AI is a smart, AI-powered closet management system designed to help users organize their wardrobe, suggest outfits based on real-time weather conditions, and upload new items seamlessly. 

## Contributors

Our project was a collaborative effort, with all team members contributing equally across various aspects. 

- [**Sudeep Joshi**](https://github.com/SudeepJoshi456) - Frontend, API integrations, deployment, backend.
- [**Bikash Gautam**](https://github.com/bkshgtm) - Backend, API integrations, database.
- [**Itiza Subedi**](https://github.com/ItiSu) - Frontend, UI/UX improvements, Firebase integration, backend.


## Table of Contents
- [Contributors](#contributors)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [AI and Machine Learning](#ai-and-machine-learning)
- [Future Plans](#future-plans)
- [License](#license)
    

## Features
- **Closet Management**: Organize your wardrobe into tops and bottoms for easy access.
- **Add New Outfits**: Easily add outfits by specifying their color, name, and category (top or bottom).
- **AI-Powered Outfit Suggestions**: Based on the current weather conditions, the app suggests what to wear.

## Tech Stack
- **Frontend**: Next.js, TypeScript
- **Backend**: Firebase (Firestore, Authentication)
- **CSS**: Styled Components, TailwindCSS
- **API**: OpenWeatherMap, Gemini, Geolocation API
- **Deployment**: Vercel
- **Other Libraries**: `Axios`, `React Firebase Hooks`

## Installation

Follow these steps to get started with **Outfitory AI**:

1. Clone the repository:
   ```bash
     git clone https://github.com/yourusername/outfitory-ai.git
2. Navigate to the project folder:
   ```bash
     cd outfitory-ai
3. Install dependencies:
   ```bash
     npm install
4. **Set Up Firebase**

To integrate Firebase into your project, you need to follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project (if you don't have one).
3. In your project settings, add a web app and copy the Firebase configuration details.
4. Create a `.env.local` file in the root of your project and add the following environment variables, replacing the placeholders with your actual Firebase configuration values:

    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
5. **Set Up OpenWeather API**

To use the OpenWeather API for fetching weather data, follow these steps:

1. Go to the [OpenWeather API website](https://openweathermap.org/api).
2. Sign up for a free account if you don’t already have one.
3. After logging in, navigate to the API section and obtain your API key.
4. In your `.env.local` file, add the following environment variable:

    ```plaintext
    NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
    ```

6. **Set Up Gemini API**

  To integrate the Gemini API for additional features, follow these steps:

1. Visit the [Gemini API documentation](https://docs.gemini.com/rest-api/).
2. Create a Gemini account if you do not have one and navigate to the API section.
3. Generate your API key and secret.
4. Add the following environment variables to your `.env.local` file:

    ```plaintext
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    ```

Make sure to restart your development server after updating the `.env.local` file for the changes to take effect.

7. Run the application
   ``` bash
   npm run dev
   ```

8. Access the application
   ``` bash
   http://localhost:3000
   ```

## How to Use 

Once you have installed the **Outfitory AI** project and started the development server, you can begin using the application. Follow these steps:

### 1. Sign Up / Log In

- Navigate to the home page of the application.
- If you are a new user, click on the **Sign Up** button to create a new account.
- If you already have an account, click on the **Log In** button and enter your credentials.

### 2. Adding Outfits

- After logging in, you will be taken to your closet page.
- Click on the **Add Outfit** button to open the form.
- Fill in the details of your outfit:
  - **Color**: Enter the color of the outfit.
  - **Outfit Name**: Provide a name for your outfit.
  - **Category**: Select whether the outfit is a **Top** or **Bottom**.
- Click the **Add Outfit** button to save the outfit to your closet.


### 3. View Your Closet

- Your added outfits will be displayed in two separate lists: **Tops** and **Bottoms**.
- You can view, remove, or edit any outfit from your closet.

### 4. AI Recommendations

- Based on the outside temperature, the application will suggest outfits for you to wear.
- Ensure your location settings are enabled to receive accurate temperature information.

### 5. Log Out

- To log out, click on the **Log Out** button located in your profile menu.

## AI and Machine Learning

In this project, we leverage AI and Machine Learning to enhance user experience by providing personalized outfit recommendations based on the current weather conditions. The key components of our AI implementation include:

- **Weather Data Integration**: We utilize the OpenWeather API to fetch real-time weather data, including temperature and conditions, which informs our outfit suggestions.

- **Outfit Recommendation with Gemini**: We use Gemini to suggest which outfit users should wear today by analyzing the user's closet as stored in the database. This allows us to determine suitable outfits based on the available clothing items and the current weather.

## Future Plans

Our plan is to integrate Google Cloud Vision, enabling users to easily add outfits to their closet. With this feature, users will be able to click pictures of their outfits, and the AI will automatically categorize each item. This seamless integration will ensure that the outfit details are accurately captured and stored in the user's closet in the database, enhancing the overall user experience and making closet management even more intuitive.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.






  


 
