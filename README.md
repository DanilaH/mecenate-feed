# Mecenate Feed

React Native + Expo приложение для тестового задания Mecenate. Реализованы экран ленты публикаций и экран детальной публикации с комментариями, лайками и real-time обновлениями.

## Demo

<p align="center">
  <img src="assets/demo.gif" alt="Mecenate Feed demo" width="360" />
</p>

## Возможности

- Лента постов с автором, аватаром, обложкой, превью, лайками и комментариями.
- Курсорная пагинация и pull-to-refresh.
- Фильтр ленты: Все / Бесплатные / Платные.
- Платные посты `tier: "paid"` с blurred-заглушкой и кнопкой доната.
- Error state API: сообщение `Не удалось загрузить публикации` и кнопка повтора.
- Детальный экран поста с полным текстом, автором, обложкой и комментариями.
- Lazy load комментариев.
- Переключение сортировки комментариев: сначала залайканные / сначала новые.
- Поле ввода и отправка нового комментария.
- Лайк поста с optimistic update, Reanimated-анимацией и haptic feedback.
- WebSocket-подписка на новые лайки и комментарии.
- Дизайн-токены для цветов, типографики, радиусов и отступов.

## Стек

- TypeScript
- React Native + Expo
- React Navigation
- TanStack React Query
- MobX
- Reanimated
- Expo Haptics
- Expo Image
- Expo Blur
- Expo SecureStore
- Zod

## Быстрый Старт

```bash
npm install
cp .env.example .env
npm run start
```

Запуск через туннель:

```bash
npm run tunnel
```

Запуск web-версии:

```bash
npm run web
```

## Переменные Окружения

`.env.example`:

```env
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_USER_UUID=550e8400-e29b-41d4-a716-446655440000
```

`EXPO_PUBLIC_API_URL` - базовый URL API.

`EXPO_PUBLIC_USER_UUID` - идентификатор пользователя для тестового API.

## Скрипты

```bash
npm run start
npm run tunnel
npm run web
npm run android
npm run ios
npm run typecheck
npm run lint
npm run format
```

## Архитектура

Проект организован вокруг экранов и небольших общих слоев:

```text
src/
  api/              axios-клиент, API-методы и Zod-схемы
  components/       переиспользуемые UI-компоненты
  hooks/            React Query hooks и realtime hook
  navigation/       типы навигации
  query/            query keys и ручная синхронизация React Query cache
  screens/
    feed/           локальные компоненты и view-model ленты
    post-detail/    локальные компоненты и view-model детального поста
  shared/ui/        общие layout/UI primitives
  stores/           MobX store для UI-состояния ленты
  tokens/           дизайн-токены
  types/            общие TypeScript-типы
  utils/            небольшие helpers
```

Главная идея: `FeedScreen` и `PostDetailScreen` остаются тонкими entry points, а композиция, layout и view-model логика вынесены в папки конкретных экранов.

## Технические Детали

- `EXPO_PUBLIC_USER_UUID` используется как тестовый идентификатор пользователя для API.
- Лайки комментариев обрабатываются на клиенте.
- Realtime-соединение использует WebSocket endpoint тестового API.
