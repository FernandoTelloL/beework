# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

```
beework
├─ README.md
├─ app
│  ├─ (tabs)
│  │  ├─ _layout.tsx
│  │  ├─ explore.tsx
│  │  └─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ package-lock.json
├─ package.json
└─ tsconfig.json

```
```
beework
├─ README.md
├─ app
│  ├─ (stack)
│  │  ├─ _layout.tsx
│  │  ├─ allowNotification
│  │  │  └─ index.tsx
│  │  ├─ codeVerification
│  │  │  └─ index.tsx
│  │  ├─ contacts
│  │  │  └─ index.tsx
│  │  ├─ createAccount
│  │  │  └─ index.tsx
│  │  ├─ createPassword
│  │  │  └─ index.tsx
│  │  ├─ customizeCreateAccount
│  │  │  └─ index.tsx
│  │  ├─ dataConfirmation
│  │  │  └─ index.tsx
│  │  ├─ description
│  │  │  └─ index.tsx
│  │  ├─ follow
│  │  │  └─ index.tsx
│  │  ├─ interests
│  │  │  └─ index.tsx
│  │  ├─ profilePicture
│  │  │  └─ index.tsx
│  │  ├─ userName
│  │  │  └─ index.tsx
│  │  └─ welcome
│  │     └─ index.tsx
│  ├─ (tabs)
│  │  ├─ _layout.tsx
│  │  ├─ explore.tsx
│  │  └─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  ├─ Poppins-Black.ttf
│  │  ├─ Poppins-Bold.ttf
│  │  ├─ Poppins-ExtraBold.ttf
│  │  ├─ Poppins-Light.ttf
│  │  ├─ Poppins-Medium.ttf
│  │  ├─ Poppins-Regular.ttf
│  │  ├─ Poppins-SemiBold.ttf
│  │  └─ Poppins-Thin.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ logo2.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ eas.json
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ src
│  ├─ contexts
│  │  └─ README.md
│  ├─ hooks
│  │  └─ README.md
│  ├─ modules
│  │  └─ auth
│  │     ├─ adapters
│  │     ├─ components
│  │     ├─ context
│  │     │  ├─ AuthStore.ts
│  │     │  └─ CreateAccountStore.ts
│  │     ├─ domain
│  │     │  ├─ AuthRepository.ts
│  │     │  └─ User.ts
│  │     ├─ infrastructure
│  │     │  └─ AuthRepositoryImpl.ts
│  │     ├─ usecases
│  │     │  ├─ GetUserNameUseCase.ts
│  │     │  ├─ LoginUserUseCase.ts
│  │     │  └─ SaveUserNameUseCase.ts
│  │     └─ validation
│  │        ├─ loginSchema.ts
│  │        └─ passwordSchema.ts
│  ├─ services
│  ├─ shared
│  ├─ theme
│  │  └─ README.md
│  └─ utils
│     ├─ README.md
│     └─ dateHelpers.ts
├─ tailwind.config.js
└─ tsconfig.json

```