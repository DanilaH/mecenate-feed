# Mecenate Feed

Экран ленты публикаций для платформы Mecenate — сервиса поддержки авторов.

## Стек

- **React Native + Expo** (managed workflow)
- **TypeScript**
- **React Query** (`@tanstack/react-query`) — серверный стейт, курсорная пагинация
- **MobX** (`mobx` + `mobx-react-lite`) — UI стейт, optimistic updates лайков
- **FlashList** (`@shopify/flash-list`) — высокопроизводительный список
- **expo-image** — оптимизированная загрузка изображений

## Функциональность

- ✅ Лента постов с аватаром, именем автора, обложкой, превью, счётчиками
- ✅ Платные посты (`tier: "paid"`) — заглушка вместо текста
- ✅ Курсорная пагинация (подгрузка при скролле вниз)
- ✅ Pull-to-refresh
- ✅ Фильтрация по типу: Все / Бесплатные / Платные
- ✅ Кнопка лайка с optimistic update и анимацией
- ✅ Скелетон при первой загрузке
- ✅ Экран ошибки «Не удалось загрузить публикации» с кнопкой «Повторить»
- ✅ Экран пустой ленты

## Быстрый старт

### 1. Клонирование

```bash
git clone <repo-url>
cd mecenate-feed
```

### 2. Переменные окружения

```bash
cp .env.example .env
```

Отредактируй `.env`:

```env
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_USER_UUID=550e8400-e29b-41d4-a716-446655440000
```

> `EXPO_PUBLIC_USER_UUID` — любой валидный UUID v4, используется как токен авторизации.

### 3. Установка зависимостей

```bash
npm install
```

Установлены дополнительные библиотеки (`expo-secure-store`, `react-native-safe-area-context`, `expo-blur`, `eslint`, `prettier`).

### 4. Проверка кода (Linter)

Для проверки стиля кода запущен проект ESLint и Prettier:
```bash
npm run lint
npm run format
```

### 5. Запуск

```bash
npx expo start
```

Открой в **Expo GO** на iOS или Android, отсканировав QR-код.

## Переменные окружения

| Переменная | Описание | Default |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | Базовый URL API | `https://k8s.mectest.ru/test-app` |
| `EXPO_PUBLIC_USER_UUID` | UUID пользователя для авторизации | `550e8400-e29b-41d4-a716-446655440000` |

## Структура проекта

```
src/
├── api/
│   ├── client.ts        # Axios instance c UUID авторизацией
│   └── posts.ts         # API функции
├── stores/
│   └── FeedStore.ts     # MobX store (tabBar, optimistic likes)
├── hooks/
│   └── useFeed.ts       # React Query infinite query + like mutation
├── types/
│   └── api.ts           # TypeScript типы
├── tokens/
│   └── design.ts        # Дизайн-токены (цвета, отступы, типографика)
├── components/
│   ├── PostCard.tsx      # Карточка поста
│   ├── AuthorRow.tsx     # Аватар + имя автора
│   ├── LikeButton.tsx    # Кнопка лайка с анимацией
│   ├── LockedPost.tsx    # Заглушка платного поста
│   ├── TabBar.tsx        # Фильтр по типу постов
│   ├── SkeletonCard.tsx  # Скелетон загрузки
│   ├── ErrorState.tsx    # Экран ошибки
│   └── EmptyState.tsx    # Пустая лента
└── screens/
    └── FeedScreen.tsx    # Главный экран
```
