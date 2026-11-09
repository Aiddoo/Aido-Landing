# Aido Privacy Policy

**Effective Date: November 10, 2026** · Previous policy: effective March 13, 2026 (including the notices added on October 4, 26 and 27, 2026)

---

RedBand (hereinafter "Company") complies with the Personal Information Protection Act, the Act on Promotion of Information and Communications Network Utilization and Information Protection, and other applicable laws, and establishes and discloses this Privacy Policy to safely process users' personal information.

### What changed in this revision (November 10, 2026, app 1.15.0)

- **Speak to add and Voice notes**: Where speech is turned into text, how audio files stay on your device and are deleted after 30&nbsp;days, and that our server doesn't store transcripts (Articles 2, 4 and 8-2).
- **AI providers**: In addition to Google, Anthropic and OpenAI may process AI features. This applies only to Members who agree to the new notice, and we list each provider's retention period and whether data is used for training (Articles 6, 7 and 8).
- **Subscriptions**: The information we process for the 2-week free trial on the yearly plan and for reminders 3&nbsp;days before a trial ends and 7&nbsp;days before a yearly renewal (Articles 2 and 3).
- **Notifications**: We separate service and transactional notifications from promotional ones, and send promotional notifications only to Members who opt in separately (Article 10-2).
- **List updates**: Amazon Web Services (server hosting) and Discord (operator alerts) were added to the processor and cross-border transfer lists, and Firebase Crashlytics and camera access, which we no longer use, were removed. AI provider retention periods now match each provider's current policy.

---

## Article 1 (Purpose of This Privacy Policy)

This Privacy Policy is intended to inform users about the processing of personal information collected and used in the course of using "Aido" (hereinafter "Service"), an AI-powered social to-do management service provided by the Company.

---

## Article 2 (Personal Information Collected and Collection Methods)

### 2-1. Directly Provided by Users

| Category | Items Collected | Required/Optional |
|----------|----------------|-------------------|
| Email Registration | Email address, password, User Tag (UserTag) | Required |
| Profile Settings | Name (nickname), profile image | Optional |
| Customer Inquiries | Inquiry content, contact information for response | Required |
| Marketing Consent | Whether you agreed to marketing information (email) and to promotional push notifications, when you agreed to or withdrew each, and when we last reminded you of your consent (every 2&nbsp;years) | Optional |
| AI Data Sharing Consent | Whether you agreed or withdrew, the notice version you answered, consent timestamp | Optional |
| Using AI features | Text for AI to organize (sentences and memos you type, and text converted from speech) — used only for organizing and not stored on the Company's servers (Article 8) | When you use AI features |
| Reports | Report target (the reported Member and the content type and ID), reason, details (up to 500 characters) | Required when reporting (details are optional) |

- **Right to Refuse Optional Items**: Users may decline to provide optional items. Refusal does not restrict access to the basic functions of the Service. However, certain supplementary features such as profile display, marketing information and AI features may be limited.

### 2-2. Automatically Collected During Service Use

| Items Collected | Purpose of Collection |
|----------------|----------------------|
| Device Information (Device ID, Platform (iOS/Android), device model, app version, User-Agent) | Service optimization, security, providing features by app version |
| IP Address | Prevention of fraudulent use, access record management |
| App Usage Records (access time, screen views, event logs) | Service improvement, error response |
| Push Token (Expo Push Token) | Notification delivery |
| Error Information (Sentry: error logs, request information, replays of the screen where an error occurred, with text and images masked) | App and server stability improvement |
| Timezone Information (IANA format) | Notification and reminder timezone settings |
| Location (latitude and longitude, only if location permission is granted) | Providing weather, air quality, and sunrise/sunset information and weather notifications for the current location |
| Last Login Timestamp | Fraudulent use detection, account management |
| Last Active Timestamp | Inactive user detection, service improvement |
| Device Fingerprint (User-Agent + IP hash) | Session security, unauthorized access detection |
| AI usage records (monthly usage per feature, a charge or refund record for each request, and a hash (SHA-256) of the request content so the same request isn't charged twice) | Managing usage limits per plan, explaining charges |
| Subscription information (received from the stores and RevenueCat: product, subscription period, auto-renew status, whether it's a free trial, store and billing environment, country, amount paid, transaction ID) | Checking subscription status, free trial ending and yearly renewal reminders, responding to inquiries |
| Block records (the blocking Member, the blocked Member, time of blocking) | Restricting friend connections and interactions with blocked Members, hiding each other's content |
| Report status, time of reporting | Reviewing and handling reports, limiting repeated or duplicate reports |
| Hash of app installation identifier (on iOS, the first IDFV value kept in the device Keychain; on Android, the Android ID) and of verified email or social sign-in account ID, collected when accepting an invite (HMAC-SHA256; original values are not stored) | Preventing duplicate claims of friend invite rewards (abuse prevention) |
| App installation identifier (iOS: stored in the device Keychain under `aido_installation_id`; only a hash is stored on our server) | Preventing duplicate claims of friend invite rewards. It may remain after you delete the app until the device is reset |

- The Service does not collect advertising identifiers (IDFA or Android advertising ID) and does not track you by linking our data with data collected from other companies' apps or websites.

### 2-3. Device Permissions and Information Stored on Your Device

The app asks for each permission through the system prompt when you first use the feature that needs it. You can change or revoke permissions at any time in your device settings. If you don't allow a permission, everything except that feature keeps working.

| Permission | Used for |
|------------|----------|
| Microphone | Speak to add, Voice notes, and dictating subtasks. Used only after you tap the button; never records while the app is in the background |
| Speech recognition | Turning what you say into text. See Article 8-2 for where this is processed |
| Location (only while using the app) | The weather screen and weather notifications. Background location is not used |
| Notifications | Push notifications such as to-do reminders, friend activity and billing notices |
| Photo library (add only) | Saving shared images to your photo library. We don't read your photos or send them to our servers |

- **Information kept only on your device**: Voice note audio files, transcripts and summaries are stored on your device and are not sent to the Company's servers. They are deleted automatically 30&nbsp;days after they're created, and you can delete them sooner in the app under **Me** tab > **Recording storage**. If device backup (iCloud, Google backup, etc.) is on, they may be included in backups. Only the to-dos and memos you choose to save from the results are stored on our servers.

### 2-4. Information Received from Third Parties via Social Login (OAuth)

| OAuth Provider | Items Received |
|---------------|---------------|
| **Google** | Email address, name, profile image |
| **Kakao** | Email address, nickname, profile image |
| **Naver** | Email address, name, profile image |
| **Apple** | Email address (name is provided only at initial login; email may be masked per Apple's policy) |

- Information received through social login is subject to the respective OAuth provider's policies and may vary depending on the privacy settings configured by the user with that provider.

---

## Article 3 (Purpose of Processing Personal Information)

The Company processes collected personal information only for the following purposes:

| Purpose | Details |
|---------|---------|
| Member Management | Member identification, registration/withdrawal processing, identity verification, prevention of fraudulent use |
| Service Provision | Core features including task management, recurring to-dos, calendar (weekly/monthly), friend sharing, Nudge, Cheer, Social Digest (weekly summary of friends' activities), weekly achievement badges, streaks, and weather for the current location. Publicly shared to-dos are visible to mutual followers, and Nudge and Cheer messages are delivered to the recipient. |
| AI Feature Provision | Organizing sentences and memos into to-dos, Speak to add, Voice notes (summaries, key points and to-dos), weekly & monthly AI reports, and recurring to-do suggestions (only with AI data sharing consent; see Article 8) |
| Subscription and Payment Management | Checking paid subscription and free trial status, receipt verification, reminders 3&nbsp;days before a free trial ends and 7&nbsp;days before a yearly renewal, responding to billing inquiries |
| Notification Delivery | Service notifications (to-do reminders, morning & evening reminders, weather notifications, social notifications such as friend requests, Nudges and Cheers, AI reports, how-to tips, service announcements) and transactional notifications (free trial ending, yearly renewal and reward Premium ending notices, confirmations of your promotional consent) |
| Service Improvement | Usage statistics analysis, error response, service quality enhancement |
| Abuse Prevention | Preventing friend invite rewards from being claimed repeatedly with the same device or account details |
| User Protection | Restricting friend requests, invite acceptance, Nudges, Cheers, comments, replies and likes between Members where one has blocked the other, hiding each other's content, and receiving, reviewing and acting on reports of policy violations |
| Customer Support | Inquiry response, complaint handling, notice delivery |
| Marketing (Optional) | Sending event and offer news and promotional push notifications (come-back reminders, streak-at-risk and lunchtime reminders, Nudge suggestions, social digests, AI recurring to-do suggestion alerts, friend invite progress reminders, etc.), only to Members who opt in separately (Article 10-2) |

---

## Article 4 (Retention and Use Period of Personal Information)

The Company destroys personal information without delay once the purpose of collection and use has been achieved. However, where retention is required by applicable laws, information is retained for the following periods:

| Retained Items | Retention Period | Legal Basis |
|---------------|-----------------|-------------|
| Records related to contracts or withdrawal of offers | **5&nbsp;years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to payment and supply of goods | **5&nbsp;years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to consumer complaints or dispute resolution | **3&nbsp;years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to advertising and display | **6&nbsp;months** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Service access records (login records, access logs) | **3&nbsp;months** | Protection of Communications Secrets Act, Article 15-2 |
| Records related to identity verification | **6&nbsp;months** | Act on Promotion of ICT Network Utilization, Article 44-5 |

### Service Operational Data Retention Periods

| Data Item | Retention Period | Basis |
|-----------|-----------------|-------|
| Security Logs (SecurityLog) | **90&nbsp;days** | Fraud prevention and security auditing |
| Login Attempt Records (LoginAttempt) | **30&nbsp;days** | Abnormal login detection and prevention |
| Notification Data (Notification) | **90&nbsp;days** | Notification history and service provision |
| Session Information (Session) | **Until session expiry or revocation** | Authentication and access management |
| Daily Completion Records (DailyCompletion) | **Until Member withdrawal** | Core service provision (streaks, statistics) |
| Weekly Achievement Records (WeeklyAchievement) | **Until Member withdrawal** | Weekly achievement badges and statistics |
| AI Reports (AiReport) | **Until Member withdrawal** | AI report viewing service provision |
| Text sent for AI organizing (including transcripts) | **Not stored on the Company's servers** (only the result is held in server memory for up to 10&nbsp;minutes to answer the same request again) | AI feature provision |
| AI usage records (QuotaUsage, QuotaCharge) | **Until Member withdrawal** (request content hashes are deleted after **7&nbsp;days**) | Managing plan limits, explaining charges and refunds |
| Voice note audio, transcripts and summaries (stored on your device) | Deleted automatically **30&nbsp;days after creation** (you can delete them sooner) | Playback and organizing |
| Location (UserLocation, last received latitude and longitude) | **Until Member withdrawal** (overwritten when a new location is received) | Providing weather information for the current location |
| Subscription information (Subscription, including when trial and renewal reminders were sent) | **Until Member withdrawal** (payment records for the legal periods above) | Checking subscription status and sending billing notices |
| Invite relationships, acceptance, active-day and reward records | **Until Member withdrawal** | Friend invite and reward service provision |
| Hash values for preventing duplicate reward claims (RewardClaim) | **For as long as the abuse-prevention purpose continues (kept after Member withdrawal)** | Preventing repeated claims of friend invite rewards |
| Block records (UserBlock) | **Until unblocked, or until the blocking or blocked Member withdraws** | Providing the block feature |
| Report records (UserReport: reporter, target, reason, details, status) | **Until the reporting or reported Member withdraws** | Reviewing reports, responding to repeated violations |
| AI data sharing consent records (decision, notice version, consent timestamp) | **Until Member withdrawal** (on withdrawal of consent, the consent timestamp is cleared and the withdrawn status is kept) | Confirming consent status and keeping a record of the basis for processing |
| Marketing and promotional push consent records | **Until Member withdrawal** | Confirming consent status, reminding you of your consent every 2&nbsp;years |

- Upon Member withdrawal, the Company applies a **30-day grace period** before destroying personal information. If the Member logs in again within the grace period, the account is restored. After the grace period, personal information is permanently deleted except for information that must be retained under the legally mandated retention periods above.
- Invite relationships and reward records are deleted together with the account upon Member withdrawal. However, the hash values used to prevent duplicate reward claims are not linked to any user information and cannot identify an individual, and are kept after Member withdrawal to prevent abuse.
- Block records, report records and AI data sharing consent records are deleted when the account is permanently deleted after the grace period. Report records are also deleted when either the reporting or the reported Member's account is permanently deleted. Report notification emails sent to the operator are kept for as long as needed to handle the report and any related dispute, and then destroyed.
- Voice note recordings kept only on your device can't be deleted by the Company. Regardless of account deletion, they are removed by the 30-day automatic deletion, in **Recording storage** in the app, or by deleting the app. If a different account signs in on the same device, the previous account's recordings are deleted.

---

## Article 5 (Provision of Personal Information to Third Parties)

The Company does not provide personal information to third parties without the user's consent, except in the following cases:

1. When the user has given prior consent
2. When required by law, or when requested by investigative authorities in accordance with procedures and methods prescribed by law

---

## Article 6 (Entrustment of Personal Information Processing)

The Company entrusts personal information processing to the following parties for service provision:

| Entrusted Party | Entrusted Tasks | Items Processed |
|----------------|-----------------|-----------------|
| **Amazon Web Services, Inc.** | Server and database hosting (Seoul region) | Information stored on the Company's servers in the course of using the Service |
| **Anthropic, PBC** | AI features (Claude API) | The AI data listed in Article 8 (only for Members who agreed to the new notice) |
| **Google LLC** | In-app payment processing, social login, AI features (Gemini API), Firebase Analytics | Payment information, authentication information, the AI data listed in Article 8, app analytics data |
| **OpenAI OpCo, LLC** | AI features (OpenAI API) | The AI data listed in Article 8 (only for Members who agreed to the new notice) |
| **RevenueCat, Inc.** | Subscription payment management, receipt verification, checking free trial status | Subscription status, product ID, purchase history, whether it's a free trial, user identifier mapping (revenueCatUserId) |
| **Apple Inc.** | In-app payment processing, social login | Payment information, authentication information |
| **Kakao Corp.** | Social login, KakaoTalk sharing | Authentication information |
| **Naver Corp.** | Social login | Authentication information |
| **Functional Software, Inc. (Sentry)** | App and server error tracking, stability monitoring | Error logs, request information, IP address, device information, replays of the screen where an error occurred (text and images masked) |
| **Resend, Inc.** | Email delivery (verification and notification emails, report notifications to the operator) | Email address, report notification content (report ID, user tags and IDs of the reporting and reported Members, target type and ID, reason, details) |
| **650 Industries, Inc. (Expo)** | Push notification delivery | Push tokens, device information, notification content |
| **Discord Inc.** | Sign-up and subscription alerts for operators (internal operations channel) | Email address, name, member ID, subscription product, store, amount, country, device model and app version |

- Speech recognition, which turns what you say into text, uses the Apple or Google speech recognition provided by your device's operating system. The Company doesn't receive or store your voice; see Article 8-2 for how it's processed.

Entrustment contracts specify restrictions on processing personal information beyond the scope of entrusted tasks, technical and organizational safeguards, restrictions on re-entrustment, and management and supervision, in accordance with the Personal Information Protection Act.

---

## Article 7 (Cross-Border Transfer of Personal Information)

The Company transfers personal information overseas for service provision as follows:

| Recipient (country, privacy contact) | Items Transferred | Purpose | Retention Period |
|-----------|------------------|---------|-----------------|
| **Anthropic, PBC** (United States · [Privacy Policy](https://www.anthropic.com/legal/privacy)) | The AI data listed in Article 8 | AI feature provision | Deleted within 30&nbsp;days of receipt (except for usage policy enforcement or legal obligations). Not used to train AI models |
| **Google LLC** (Gemini API) (United States and other countries where Google has data centers · [Privacy Policy](https://policies.google.com/privacy)) | The AI data listed in Article 8 | AI feature provision | Kept for a limited period for abuse monitoring, then deleted (Gemini API terms for paid services). Not used to train AI models |
| **OpenAI OpCo, LLC** (United States · [Privacy Policy](https://openai.com/policies/privacy-policy/)) | The AI data listed in Article 8 | AI feature provision | Response storage off (`store: false`). Abuse monitoring logs are kept for up to 30&nbsp;days, then deleted. Not used to train AI models |
| **Google LLC** (Firebase Analytics) (United States · [Privacy Policy](https://policies.google.com/privacy)) | App usage records, device information | Service usage statistical analysis | Until Member withdrawal or purpose fulfillment |
| **Apple Inc.** (United States · [Privacy Policy](https://www.apple.com/legal/privacy/)) | Authentication information, payment information | Social login, in-app payment | Per each service's policy |
| **RevenueCat, Inc.** (United States · [Privacy Policy](https://www.revenuecat.com/privacy)) | Subscription status, purchase history, whether it's a free trial, user identifier mapping (revenueCatUserId) | Subscription payment management | Service use period + legally mandated retention period |
| **Functional Software, Inc. (Sentry)** (United States · [Privacy Policy](https://sentry.io/privacy/)) | Error logs, request information, IP address, device information, screen replays of errors (text and images masked) | App and server error tracking, stability monitoring | 90&nbsp;days |
| **650 Industries, Inc. (Expo)** (United States · [Privacy Policy](https://expo.dev/privacy)) | Push tokens, device information, notification content | Push notification delivery | Duration of service use |
| **Resend, Inc.** (United States · [Privacy Policy](https://resend.com/legal/privacy-policy)) | Email address, report notification content | Email delivery (verification, notification, report notifications) | Duration of service use |
| **Discord Inc.** (United States · [Privacy Policy](https://discord.com/privacy)) | Email address, name, member ID, subscription product, store, amount, country, device model and app version | Sign-up and subscription alerts for operators | Until the Company deletes the messages in its operations channel |

- **When and how**: Data is sent over encrypted network connections (HTTPS/TLS) each time you use the relevant feature or processing is needed.
- **Transfers to AI providers**: We send data only for Members who have agreed to **AI data sharing** in the app, and send data to Anthropic and OpenAI only for Members who agreed to the November 4, 2026 notice (app 1.15.0) (Article 8). If you don't agree or you withdraw, only AI features become unavailable; you can keep using everything else, such as adding to-dos yourself. The retention periods and training use above reflect each provider's API policies as checked in November 2026, and we will update this policy if a provider changes them.
- **Speech recognition**: When your device can't recognize speech on its own, Apple (United States) or Google (United States) may process your voice. This is done by your operating system's speech recognition service under each company's privacy policy; the Company doesn't receive or keep your voice (Article 8-2).
- **Weather**: To get weather information, we send weather providers (Apple WeatherKit, the Korea Meteorological Administration, Korea Environment Corporation's AirKorea, etc.) only the center of an area about 5&nbsp;km across instead of your exact coordinates, and never anything that identifies you.
- **How to refuse and what happens**: AI data isn't transferred if you don't agree or if you withdraw under **Me** tab > **Terms & policies** > **AI data sharing**. App analytics can be limited as described in Article 10. Other transfers are essential to providing the Service; to refuse them, please request account deletion.

---

## Article 8 (AI Features and Data Processing)

1. **AI features**: The Service sends Members' data to external AI providers to provide the following AI features:
   - **Organizing to-dos**: Turns a sentence or memo you type into to-dos with a title, date, time and category
   - **Speak to add**: Turns what you say into text, then into a to-do plan. Only the to-dos you pick are saved
   - **Voice notes**: Turns a long recording into text, then into a summary, key points and to-dos
   - **Weekly & monthly AI reports** and **recurring to-do suggestions** (Premium)
2. **What we send**

   | Feature | What we send |
   |---------|--------------|
   | Organizing to-dos, Speak to add, Voice notes | What you type or say (for voice, the text produced by speech recognition), category names, and the current date and time zone. Speak to add and Voice notes also send the title (first 80 characters), date and repeat status of upcoming to-dos (up to 30) to spot overlaps with to-dos you already have |
   | AI reports | Aggregated to-do statistics for the period (total and completed counts, completion rate, streak, distributions by category, day of week and time of day, changes from the previous period), category names, and tips from the previous report |
   | Recurring to-do suggestions | To-do titles (first 80 characters), category names, records by day of week and the times recorded, and your responses to earlier suggestions |

3. **What we don't send**: Your name, email, friends or audio files.
4. **Recipients**: Anthropic (Claude), Google (Gemini) and OpenAI. We send each request to one provider first, in the order the Company sets, and if that provider can't respond, we send the same content to the next one. Each provider's retention period and training use are listed in Article 7.
5. **Use**: Only to produce the results of AI features. Never used for advertising or marketing.
6. **Processing on the Company's servers**: Text sent for AI organizing (including transcripts) is used only for organizing and is not stored on our servers. So the same request isn't charged twice, we keep an irreversible hash (SHA-256) of the request content for 7&nbsp;days, and we hold the result in server memory for up to 10&nbsp;minutes to answer the same request again. What you said, transcripts and to-do titles are not written to server logs, error tracking (Sentry) or app analytics. To-dos and memos you confirm and save are stored like any other to-do or memo.
7. **AI data sharing consent**
   - From app version 1.13.0, before you first use an AI feature, the app explains what is sent, who processes it and how it's used, and asks for your consent. If you tap **Not now** or close the notice, nothing is sent and only that AI feature doesn't run; we'll ask again the next time you use an AI feature. Our server also refuses AI requests from Members who haven't agreed.
   - When you agree or withdraw, we store your choice, the notice version and when you agreed. If the notice changes, we ask you to agree to the new version. A withdrawal stays in place even if the notice changes.
   - **Recipients by notice version**: Members who agreed to the November 4, 2026 notice (app 1.15.0) use Anthropic, Google and OpenAI. Members who agreed only to the October 26, 2026 notice (apps 1.13.0–1.14.x) use Google only. App 1.15.0 shows the updated notice once to Members who agreed to the earlier one; if you don't answer, we keep using Google only.
   - **Withdrawal**: In the app, go to **Me** tab > **Terms & policies** > **AI data sharing** to withdraw at any time, or to choose not to agree even if you never agreed. After you withdraw, no data is sent for AI features; to-dos you've already created stay as they are.
   - **Scheduled features**: Weekly and monthly AI reports and recurring to-do suggestions for Premium Members are prepared by our server on a schedule. For Members who haven't agreed, reports are built from to-do statistics alone without any AI provider, and recurring suggestions aren't created. For features you request, we use the app version in the app's request header to decide whether the consent process applies; for scheduled features, we use the latest app version recorded for your account and devices.
   - **App versions below 1.13.0**: Members who only use an older app, which has no consent screen, are processed as before, with Google only, unless they have chosen not to agree. If you don't want this, update the app and choose not to agree, or ask us to stop processing under Article 12 by emailing matthew@redband.co.kr.
8. **Limits of AI results**: AI and speech recognition can mishear words or dates, or produce content that isn't accurate. With Speak to add and memo organizing, only the results you check and pick are saved, and you can tell us about a wrong result through **Contact us** in the app.

---

## Article 8-2 (Voice Features and Recordings)

1. **Where speech becomes text**: What you say is turned into text by the speech recognition built into your device's operating system. If your device can't recognize it on its own, your voice may be sent to Apple's or Google's servers for processing.
   - **iPhone and iPad**: Speak to add and dictation are processed by Apple's speech recognition servers. Voice notes are recognized on the device when possible, and otherwise on Apple's servers.
   - **Android**: If the speech recognition model for your language is on the device, recognition happens on the device; otherwise Google speech recognition may process it over the network. Subtask dictation may be processed over the network.
   - To improve accuracy, we pass along a list of common words that are often misrecognized; your category and to-do names are passed along only when recognition happens on the device.
2. **Audio files**: Only Voice notes saves audio files, and they are stored on your device and never sent to the Company's servers. Recordings, transcripts and summaries are deleted automatically 30&nbsp;days after they're created, and you can delete them sooner under **Me** tab > **Recording storage**. They may be included in device backups.
3. **What goes to our servers**: When you ask to organize a recording, only the transcript is sent to our servers and the AI providers (Article 8), and our servers don't store it.
4. **Other people's voices**: When you record other people, such as in a meeting or class, please follow applicable laws and get their consent in advance where required.

---

## Article 9 (Automated Decision-Making)

1. The Service may perform the following **automated decisions** using AI and automation technologies:
   - Automatically organizing sentences, speech and memos into to-dos (extracting title, date, category, etc.), saved only after you confirm
   - Automatic generation of weekly and monthly AI reports (for premium users)
   - Recurring pattern detection and automatic task suggestions (for premium users)
   - Automatic to-do reminder delivery (1&nbsp;hour and 10 minutes before the scheduled time)
   - Feature usage restrictions based on your plan (monthly and daily usage limits, etc.)
2. Automated decisions do not have a **significant impact** on Members' rights or obligations and are intended for providing reference information or service operations.
3. Members may exercise the following rights regarding automated decisions:
   - Request an **explanation** of the automated decision
   - **Object** to the automated decision and request reprocessing with human intervention
4. These rights may be exercised by contacting customer support at matthew@redband.co.kr.

---

## Article 10 (Operation and Opt-Out of Automatic Collection Tools (SDKs))

1. The Company uses the following SDKs (Software Development Kits) to automatically collect information for service improvement and error response:

   | SDK | Purpose | Items Collected |
   |-----|---------|----------------|
   | **Firebase Analytics** | Service usage statistics, user behavior analysis | Screen views, event logs, device information, session information |
   | **Sentry** | App and server error tracking, stability monitoring | Error logs, request information, device information, replays of the screen where an error occurred (text and images are masked) |

2. **Behavioral Information Collection Notice**: The Company collects Members' in-app behavioral information (screen views, feature usage patterns, etc.) through Firebase Analytics only to improve the Service. We don't collect advertising identifiers, and we don't put what you said, transcripts or to-do titles into analytics events.
3. **How to Opt Out**: Users may restrict analytics data sharing through device settings or opt out by uninstalling the app. However, opting out may limit service quality improvements.

---

## Article 10-2 (Notifications and Promotional Information)

1. **Service and transactional notifications**: To-do reminders, weather notifications, friend activity, AI reports, how-to tips, service announcements, and transactional notices such as a reminder 3&nbsp;days before a free trial ends, 7&nbsp;days before a yearly subscription renews and before reward Premium ends are sent to Members who allow notifications on their device. You can turn them off under **Me** tab > **Notification settings** or in your device settings; billing details remain available in your store's subscription settings.
2. **Promotional notifications**: Event and offer news and engagement notifications such as come-back reminders, streak-at-risk and lunchtime reminders, Nudge suggestions, social digests, AI recurring to-do suggestion alerts and friend invite progress reminders are sent **only to Members who separately opt in to promotional push notifications**.
   - They are labeled "(Ad)" at the start of the title and explain how to opt out in the body. You can stop them at any time with the **Turn off promotional notifications** button on the notification or in **Notification settings** in the app.
   - We don't send promotional notifications between 9&nbsp;p.m. and 8&nbsp;a.m.
   - When you opt in or out, we tell you the date it took effect, and we remind Members who opted in of their consent every 2&nbsp;years.
3. You can use the basic features of the Service and receive service and transactional notifications without opting in to promotional information.

---

## Article 11 (Procedure and Method of Personal Information Destruction)

1. **Destruction Procedure**: Personal information is destroyed without delay after the retention period has elapsed or the processing purpose has been achieved. Information that must be retained by law is stored separately in a dedicated database (or table) and destroyed upon expiration of the retention period.
2. **Destruction Method**:
   - Electronic files: Permanently deleted using methods that prevent recovery
   - Paper documents: Shredded or incinerated

---

## Article 12 (User Rights and How to Exercise Them)

1. Users (or their legal representatives) may exercise the following rights at any time:
   - Request to **access** personal information
   - Request to **correct** errors
   - Request **deletion**
   - Request **suspension of processing**
   - **Withdraw consent**
   - Request **account withdrawal**
   - Request **personal information transfer** (right to data portability under Article 35-2 of the Personal Information Protection Act)
2. **Data Portability Notice**: Users may request that their personal information be transferred to themselves or a third party. The Company shall inform users of the scope of transferable personal information and transfer formats in accordance with the Personal Information Protection Act and related enforcement decrees.
3. Rights may be exercised in writing, via email (matthew@redband.co.kr), or through in-app settings. The Company shall take action without delay.
   - **Account withdrawal (account deletion)**: Available directly in the app: open the **Me** tab and tap **Delete Account** at the bottom. If you can't use the app, you can request deletion by email by following [How to request account deletion](/en/account-deletion).
   - **Withdrawing AI data sharing consent**: Go to **Me** tab > **Terms & policies** > **AI data sharing** in the app to withdraw at any time. After you withdraw, no data is sent for AI features; to-dos you've already created stay as they are.
   - **Withdrawing promotional consent**: Turn off marketing communications and promotional push notifications under **Me** tab > **Notification settings** in the app.
   - **Deleting recordings**: Delete recordings one by one or all at once under **Me** tab > **Recording storage** in the app.
   - **Unblocking**: You can unblock someone at any time in the app's settings under **Blocked users**.
4. If a user requests correction of errors in personal information, the Company shall not use or provide the information until the correction is completed.
5. Users may exercise their rights through a legal representative or authorized agent, in which case a power of attorney must be submitted in accordance with the Enforcement Rules of the Personal Information Protection Act.

---

## Article 13 (Measures for Personal Information Protection)

The Company implements the following technical, organizational, and physical safeguards for the safe processing of personal information:

### Technical Measures
- Encryption of personal information: Passwords are hashed using the Argon2id algorithm; sensitive information (tokens, etc.) is encrypted using AES-256-GCM
- Encryption of data transmission (HTTPS/TLS)
- Minimization of access privileges and access control
- Security updates and vulnerability assessments

### Organizational Measures
- Minimization of personnel with access to personal information
- Management and monitoring of personal information access logs
- Establishment and enforcement of internal security policies

### Physical Measures
- Infrastructure operated on cloud services (Amazon Web Services, Seoul region), with physical security governed by the cloud provider's policies

---

## Article 14 (Personal Information of Children Under 14)

1. The Service is **not intended for children under 14**, and under the Terms of Service (Article 4) the Company does not accept membership registration from children under 14.
2. The Company does not knowingly collect personal information from children under 14.
3. If the Company becomes aware that personal information of a child under 14 has been collected, it shall destroy such information without delay. Parents or guardians who learn of this can let us know at matthew@redband.co.kr.

---

## Article 15 (Personal Information Protection Officer)

The Company designates the following Personal Information Protection Officer to oversee personal information processing and handle user complaints and damage relief:

| Item | Details |
|------|---------|
| Name | Kim Yongmin |
| Position | Representative (concurrent) |
| Phone | 010-5877-8951 |
| Email | matthew@redband.co.kr |

Inquiries, complaints, and damage relief requests related to personal information may be submitted via the contact information above. The Company shall respond and provide processing results without delay.

---

## Article 16 (Personal Information Breach Relief Agencies)

For reports or consultations regarding personal information breaches, you may contact the following agencies:

| Agency | Contact | Website |
|--------|---------|---------|
| Personal Information Infringement Report Center (KISA) | (No area code) 118 | privacy.kisa.or.kr |
| Personal Information Dispute Mediation Committee | (No area code) 1833-6972 | kopico.go.kr |
| Supreme Prosecutors' Office Cyber Investigation Division | (No area code) 1301 | spo.go.kr |
| National Police Agency Cyber Bureau | (No area code) 182 | ecrm.police.go.kr |

---

## Article 17 (Changes to This Privacy Policy)

1. This Privacy Policy may be amended to reflect changes in laws, policies, or the Service.
2. In case of significant changes, the Company shall provide at least **7&nbsp;days' prior notice** through in-app announcements or push notifications before the effective date.
3. For changes that significantly affect users' rights, at least **30&nbsp;days' prior notice** shall be given through individual notification (email or push notification).
4. Processing that requires new consent (for example, adding an AI provider) applies only after you agree to the new notice in the app.

---

## Addendum

1. This Privacy Policy takes effect on **November 10, 2026** (the release date of app version 1.15.0).
2. The previous Privacy Policy (effective March 13, 2026, including the notices added on October 4, 26 and 27, 2026) ceases to have effect when this Policy takes effect. If you need the previous policy, email matthew@redband.co.kr.

### Revision history

| Effective date | Main changes |
|----------------|--------------|
| November 10, 2026 | Speak to add and Voice notes and how recordings are kept, new AI providers (Anthropic, OpenAI) and their retention periods, the yearly plan free trial and billing notices, separating service and transactional notifications from promotional ones, updated processor and cross-border transfer lists (AWS and Discord added, Firebase Crashlytics removed) |
| October 27, 2026 | Website analytics notice updated for Consent Mode and Vercel Web Analytics |
| October 26, 2026 | Friend invite reward abuse prevention, block and report, and AI data sharing consent notices added (applied from app 1.13.0) |
| October 4, 2026 | Website analytics notice added |
| March 13, 2026 | Previous policy took effect |

---

## Official website analytics notice (added October 4, 2026; updated October 27, 2026)

This notice applies to analytics on the official aido.kr website. On your first visit, a small card at the bottom of the screen lets you **Allow** or **Decline** Google&nbsp;Analytics cookies, and you can change your choice at any time with **Cookie settings** at the bottom of the website. Declining does not limit access to content or store links. Your choice is saved in your browser for 180&nbsp;days. If your browser sends a Do Not Track or Global Privacy Control signal, we treat it as Decline regardless of any saved choice, do not show the card and do not load Google&nbsp;Analytics at all.

- **Google&nbsp;Analytics 4 (Google LLC)** measures page visits, referral sources, campaigns, language, feature guide card selections, store button clicks and whether an invite code was copied to improve the website. We use Google Consent Mode v2. Before you allow it, or if you decline, no analytics cookies are stored or read; only cookieless visit, device and browser information is sent to Google and may be used for aggregate reporting and modeling. If you **Allow**, an analytics cookie (`_ga`) is used to recognize return visits. Consent for ad storage, ad user data and ad personalization always stays denied, and Google Signals is not used. A store button click does not mean an app installation or purchase.
- **Vercel Web Analytics (Vercel Inc.)** provides cookie-free, aggregated visit statistics that do not identify individuals, and runs regardless of your choice. It counts pages, referral sources, device and browser types and the events above.
- We do not send member identifiers, email addresses, to-do or note content, invite codes, arbitrary URL queries or fragments to analytics. Invite link addresses are counted only as a path without the code, and campaign UTM values are limited to a defined format.
- Switching to **Decline** stops Google&nbsp;Analytics cookie use and clears this site's Google&nbsp;Analytics cookies. Previously collected data is handled according to each analytics service's retention settings. Changing your choice does not delete historical data.

See [Google's Privacy Policy](https://policies.google.com/privacy) and [Vercel Web Analytics privacy information](https://vercel.com/docs/analytics/privacy-policy) for information about processing by these services. For website analytics questions, contact matthew@redband.co.kr.

---

## Friend invite reward abuse prevention notice (added October 26, 2026)

To prevent the same device or account details from claiming friend invite rewards more than once, when you accept an invite we store only an irreversible hash (HMAC-SHA256) of your app installation identifier (iOS IDFV or Android ID) and your verified email or social sign-in account ID. This value isn't linked to your account and is kept after account deletion to prevent abuse.

To prevent duplicate rewards, we store the app installation identifier in your device's Keychain. It may remain after you delete the app until you reset the device. Our server stores only an irreversible hash of this value.

This notice applies from the day the friend invite feature becomes available in the Aido app (the release date of app version 1.13.0).

---

## Block and report notice (added October 26, 2026)

We provide block and report features so you can cut off people you don't want to hear from and flag inappropriate content.

- **Blocking**: When you block a Member, we store who blocked whom and when. Your friendship and any pending friend requests between you are removed right away, and neither of you can see the other's to-dos, comments, Nudges or Cheers. The blocked Member can't send you friend requests, connect with you through your invite code, Nudge or Cheer you, or comment, reply or like toward you. We don't notify the other person that they were blocked.
- **Unblocking**: When you unblock someone in the app's settings under **Blocked users**, we delete the block record. The removed friendship isn't restored, so you'll need to send a new friend request to become friends again.
- **Reporting**: You can report a profile, to-do, comment, Nudge message or Cheer message. We store the reporter, the reported Member, the content type and ID, the reason (spam or advertising, harassment or abuse, inappropriate content, impersonation, other), any details you write (optional, up to 500 characters), the report status and when you reported. We don't copy the reported content itself into the report record.
- **Operator review**: So an operator can review it, each report is emailed to our support inbox through our email delivery service (Resend) with the report ID, both Members' user tags and IDs, the content type and ID, the reason and the details. It doesn't include the reporter's email address, and we don't tell the reported Member about the report or who made it.
- **Retention and deletion**: Block records are kept until you unblock or either account is permanently deleted. Report records are kept until the reporting or reported Member's account is permanently deleted. Report notification emails in the operator inbox are kept for as long as needed to handle the report and any related dispute, and then destroyed.

This notice is published in advance on October 26, 2026 and applies from the day block and report features become available in the Aido app (the release date of app version 1.13.0).
