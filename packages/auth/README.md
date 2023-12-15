# Auth Module

### STRUCTURE

```tree
├── package.json
├── [rest configs]
├── tests/
└── libs/
  ├── services/
  │  └── [service_name].ts
  ├── routers.ts
  └── mod.ts
```

|                 |                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **libs/**       | the source codes, named `libs` couase making name formal.                                                      |
| **libs/mod.ts** | export default function with giving `app: express.Application` as argument. combin `services/` and `routers/`. |
| **routers.ts**  | export routers without handlers from `express.Router` constructor.                                             |
| **services/**   | directory to contain handlers of routers and more.                                                             |

### INJECTIONS IMPORTS

> [!NOTE]
>
> There is some injectable import path will be replace in compile-time with `Launcher` listed below:
>
> 1. **DATABASE**: to access to DATABASE should have import `$libs/db` to import _Mongodb_ via _Mongoose ODM_. the `$libs/db` will be replace in compile-time in `Launcher` with real path to schema's, database and ODM.
> 2. **DOT_ENV**: to access to `.env` and _Environment Variables_ should have import `$libs/env` or `$libs/var`. it will be accessed to global/environment confis or variables.
> 3. **THEME/STYLE**: import from `$libs/theme`

### USAGE

**In server-side**

first import _Auth Module_ with:

```typescript
import AuthModule from '@wonize/auth/libs/mod.ts';
```

then, invoke with pass `app` instance of `express.Application` with:

```typescript
AuthModule.init(app);
```

now _Auth Module_ will be work done in _server-side_

**In client-side**

first import _Auth Module_ to fence of _page_ with:

```typescript
import LoginPage from '@wonize/auth/pages/login.astro';
```

then, write with these `props` listed below:

```typescript
interface Props {
  methods: [
    'oauth-github',
    'oauth-google',
    'oauth-linkedin',
    'email-password',
    'emial-otp',
    'phone-password',
    'phone-otp',
  ];
}
```

in page is:

```tsx
<LoginPage methods={['email-password']} />
```

### INFORMATION

| name    | `@wonize/auth` |
| ------- | -------------- |
| private | `private`      |
