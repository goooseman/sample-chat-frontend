# Chat Service

> Library agnostic Chat Service.

### Specification

- Each message contains a randomly generated `userId`
- If there is no internet connection, sent messages are displayed (without a checkmark) and sent after the connection is reinitialized.
- User is able to change the username, but old messages will not be updated
- Chat has optimistic UI updates
- `userId` can only be changed by resetting the settings or cleaning local storage

### Frontend

This module export `ChatService` which can be used with any frontend library: React, Vue, AngularJS and etc.

In a React application, it can be connected to a React _smart_ container, which should store chat messages in its' state. Or it can be connected to a global context if data is needed in several places across the application.

`ChatAdapter` is responsible for the connection to a backend and transforming messages to our schema. By separating this responsibility we will have an ability to replace this backend socket implementation to any other.

`ChatService` is responsible for this application's business logic layer and storing full messages list in-memory.

### Backend

A server has the following API.

##### Send message

```typescript
const content: {
  id: string;
  userId: string;
  text: string;
  username: string;
  createdAt: string; // ISO 8601
  status: "none";
} = { ... };
await chatIO.emit("message", content, cb);
```

##### List messages

```typescript
const Content: {
  id: string;
  userId: string;
  text: string;
  username: string;
  createdAt: string; // ISO 8601
  status: "none";
} = { ... };
await chatIO.emit("listMessages", (err?: Error, data: { items: Content[]} ) => { ... });
```

##### Recieve message

```typescript
const Content: {
  id: string;
  userId: string;
  text: string;
  username: string;
  createdAt: string; // ISO 8601
  status: "none";
} = { ... };
chatIO.on("message", (data: Content) => { ... });
```

### TODO

- [ ] Pagination
- [ ] Authorization
- [ ] Seen marks
