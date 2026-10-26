# Aido Privacy Policy

**Effective Date: March 13, 2026**

---

RedBand (hereinafter "Company") complies with the Personal Information Protection Act, the Act on Promotion of Information and Communications Network Utilization and Information Protection, and other applicable laws, and establishes and discloses this Privacy Policy to safely process users' personal information.

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
| Marketing Consent | Marketing consent status, consent timestamp | Optional |
| AI Data Sharing Consent | Whether you agreed or withdrew, the notice version you answered, consent timestamp | Optional |
| Reports | Report target (the reported Member and the content type and ID), reason, details (up to 500 characters) | Required when reporting (details are optional) |

- **Right to Refuse Optional Items**: Users may decline to provide optional items. Refusal does not restrict access to the basic functions of the Service. However, certain supplementary features such as profile display, marketing information and AI features may be limited.

### 2-2. Automatically Collected During Service Use

| Items Collected | Purpose of Collection |
|----------------|----------------------|
| Device Information (Device ID, Platform (iOS/Android), User-Agent) | Service optimization, security |
| IP Address | Prevention of fraudulent use, access record management |
| App Usage Records (access time, screen views, event logs) | Service improvement, error response |
| Push Token (Expo Push Token) | Notification delivery |
| Error and Crash Information (Crashlytics) | App stability improvement |
| Timezone Information (IANA format) | Notification and reminder timezone settings |
| Location (latitude and longitude, only if location permission is granted) | Providing weather, air quality, and sunrise/sunset information for the current location |
| Last Login Timestamp | Fraudulent use detection, account management |
| Last Active Timestamp | Inactive user detection, service improvement |
| Device Fingerprint (User-Agent + IP hash) | Session security, unauthorized access detection |
| Daily AI Usage Count | Usage limit management per subscription plan |
| Block records (the blocking Member, the blocked Member, time of blocking) | Restricting friend connections and interactions with blocked Members, hiding each other's content |
| Report status, time of reporting | Reviewing and handling reports, limiting repeated or duplicate reports |
| Hash of app installation identifier (on iOS, the first IDFV value kept in the device Keychain; on Android, the Android ID) and of verified email or social sign-in account ID, collected when accepting an invite (HMAC-SHA256; original values are not stored) | Preventing duplicate claims of friend invite rewards (abuse prevention) |
| App installation identifier (iOS: stored in the device Keychain under `aido_installation_id`; only a hash is stored on our server) | Preventing duplicate claims of friend invite rewards. It may remain after you delete the app until the device is reset |

### 2-3. Device Permission Access (On-Device Processing)

The following items are accessed with the user's consent and are **processed only on the device; they are not transmitted to the Company's servers.**

| Access Item | Purpose |
|-------------|---------|
| Camera | Taking profile photos |
| Photo Library | Selecting profile images |
| Microphone and Speech Recognition | Voice input for to-do creation (speech is converted to text by the device's speech recognition (Apple or Google); only the resulting text, not voice recordings, is sent to and stored on the Company's servers) |

- Users may change or revoke access permissions at any time through their device settings.

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
| Service Provision | Core features including task management, calendar (weekly/monthly), friend sharing, Nudge, Cheer, Social Digest (weekly summary of friends' activities), weekly achievement badges, streaks, and weather for the current location. Publicly shared to-dos are visible to mutual followers, and Nudge and Cheer messages are delivered to the recipient. |
| AI Feature Provision | AI-powered automatic to-do parsing, memo organizing, weekly & monthly AI report generation (task statistics analysis and achievement summaries), recurring pattern analysis and automatic suggestions (from app version 1.13.0, subject to the AI data sharing consent process; see the "AI data sharing consent notice" below) |
| Subscription and Payment Management | Paid subscription processing, payment status management, receipt verification |
| Notification Delivery | To-do reminders (1 hour and 10 minutes before scheduled time), morning & evening reminders, streak maintenance reminders, social notifications (friend requests, Nudge, Cheer, social digest, etc.), Nudge encouragement notifications, Win-back notifications, service announcements |
| Service Improvement | Usage statistics analysis, error response, service quality enhancement |
| Abuse Prevention | Preventing friend invite rewards from being claimed repeatedly with the same device or account details |
| User Protection | Restricting friend requests, invite acceptance, Nudges, Cheers, comments, replies and likes between Members where one has blocked the other, hiding each other's content, and receiving, reviewing and acting on reports of policy violations |
| Customer Support | Inquiry response, complaint handling, notice delivery |
| Marketing (Optional) | Providing event and promotional information (only to consenting Members) |

---

## Article 4 (Retention and Use Period of Personal Information)

The Company destroys personal information without delay once the purpose of collection and use has been achieved. However, where retention is required by applicable laws, information is retained for the following periods:

| Retained Items | Retention Period | Legal Basis |
|---------------|-----------------|-------------|
| Records related to contracts or withdrawal of offers | **5 years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to payment and supply of goods | **5 years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to consumer complaints or dispute resolution | **3 years** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Records related to advertising and display | **6 months** | Act on Consumer Protection in Electronic Commerce, Article 6 |
| Service access records (login records, access logs) | **3 months** | Protection of Communications Secrets Act, Article 15-2 |
| Records related to identity verification | **6 months** | Act on Promotion of ICT Network Utilization, Article 44-5 |

### Service Operational Data Retention Periods

| Data Item | Retention Period | Basis |
|-----------|-----------------|-------|
| Security Logs (SecurityLog) | **90 days** | Fraud prevention and security auditing |
| Login Attempt Records (LoginAttempt) | **30 days** | Abnormal login detection and prevention |
| Notification Data (Notification) | **90 days** | Notification history and service provision |
| Session Information (Session) | **Until session expiry or revocation** | Authentication and access management |
| Daily Completion Records (DailyCompletion) | **Until Member withdrawal** | Core service provision (streaks, statistics) |
| Weekly Achievement Records (WeeklyAchievement) | **Until Member withdrawal** | Weekly achievement badges and statistics |
| AI Reports (AiReport) | **Until Member withdrawal** | AI report viewing service provision |
| Location (UserLocation, last received latitude and longitude) | **Until Member withdrawal** (overwritten when a new location is received) | Providing weather information for the current location |
| Invite relationships, acceptance, active-day and reward records | **Until Member withdrawal** | Friend invite and reward service provision |
| Hash values for preventing duplicate reward claims (RewardClaim) | **For as long as the abuse-prevention purpose continues (kept after Member withdrawal)** | Preventing repeated claims of friend invite rewards |
| Block records (UserBlock) | **Until unblocked, or until the blocking or blocked Member withdraws** | Providing the block feature |
| Report records (UserReport: reporter, target, reason, details, status) | **Until the reporting or reported Member withdraws** | Reviewing reports, responding to repeated violations |
| AI data sharing consent records (decision, notice version, consent timestamp) | **Until Member withdrawal** (on withdrawal of consent, the consent timestamp is cleared and the withdrawn status is kept) | Confirming consent status and keeping a record of the basis for processing |

- Upon Member withdrawal, the Company applies a **30-day grace period** before destroying personal information. If the Member logs in again within the grace period, the account is restored. After the grace period, personal information is permanently deleted except for information that must be retained under the legally mandated retention periods above.
- Invite relationships and reward records are deleted together with the account upon Member withdrawal. However, the hash values used to prevent duplicate reward claims are not linked to any user information and cannot identify an individual, and are kept after Member withdrawal to prevent abuse.
- Block records, report records and AI data sharing consent records are deleted when the account is permanently deleted after the grace period. Report records are also deleted when either the reporting or the reported Member's account is permanently deleted. Report notification emails sent to the operator are kept for as long as needed to handle the report and any related dispute, and then destroyed.

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
| **RevenueCat, Inc.** | Subscription payment management, receipt verification | Subscription status, product ID, purchase history, user identifier mapping (revenueCatUserId) |
| **Apple Inc.** | In-app payment processing, social login | Payment information, authentication information |
| **Google LLC** | In-app payment processing, social login, AI features (Gemini API), Firebase services | Payment information, authentication information, to-do and memo text and the to-do records used for AI reports and suggestions (AI), analytics data |
| **Kakao Corp.** | Social login | Authentication information |
| **Naver Corp.** | Social login | Authentication information |
| **Functional Software, Inc. (Sentry)** | App and server error tracking, stability monitoring | Error logs, request information, IP address, device information |
| **Resend, Inc.** | Email delivery (verification and notification emails, report notifications to the operator) | Email address, report notification content (report ID, user tags and IDs of the reporting and reported Members, target type and ID, reason, details) |
| **650 Industries, Inc. (Expo)** | Push notification delivery | Push tokens, device information |

Entrustment contracts specify restrictions on processing personal information beyond the scope of entrusted tasks, technical and organizational safeguards, restrictions on re-entrustment, and management and supervision, in accordance with the Personal Information Protection Act.

---

## Article 7 (Cross-Border Transfer of Personal Information)

The Company transfers personal information overseas for service provision as follows:

| Recipient | Country | Items Transferred | Purpose | Retention Period |
|-----------|---------|------------------|---------|-----------------|
| **Google LLC** (Firebase Analytics) | United States | App usage records, device information | Service usage statistical analysis | Until Member withdrawal or purpose fulfillment |
| **Google LLC** (Firebase Crashlytics) | United States | Error information, device information | App stability improvement | 180 days |
| **Google LLC** (Gemini API) | United States | To-do and memo text, category names, current date and time zone, and to-do statistics, titles and scheduled times used for AI reports and suggestions (see Article 8) | AI feature provision (to-do parsing, memo organizing, AI report and recurring suggestion generation) | Deleted immediately upon API processing completion (per Google's policy) |
| **RevenueCat, Inc.** | United States | Subscription status, purchase history, user identifier mapping (revenueCatUserId) | Subscription payment management | Service use period + legally mandated retention period |
| **Apple Inc.** | United States | Authentication information, payment information | Social login, in-app payment | Per each service's policy |
| **Functional Software, Inc. (Sentry)** | United States | Error logs, request information, IP address, device information | App and server error tracking, stability monitoring | 90 days |
| **650 Industries, Inc. (Expo)** | United States | Push tokens, device information | Push notification delivery | Duration of service use |
| **Resend, Inc.** | United States | Email address, report notification content | Email delivery (verification, notification, report notifications) | Duration of service use |

- Transfer Method: Transmission via encrypted network communication (HTTPS/TLS)
- Users may refuse consent to cross-border transfer; however, access to related features may be restricted.
- From app version 1.13.0, transfers to the Google Gemini API are subject to the **AI data sharing consent** requested before you use AI features (see the "AI data sharing consent notice" below). If you don't agree or withdraw consent, only AI features become unavailable; you can keep using everything else, such as adding to-dos yourself.

---

## Article 8 (Data Processing for AI Features)

1. The Service transmits Members' data to an external AI service (Google Gemini API) to provide the following AI features:
   - **Automatic To-Do Parsing**: Transmits to-do text, typed or converted from voice input, to automatically extract title, date, category, and other details
   - **Memo Organizing**: Transmits memo text to organize it into several to-dos
   - **Weekly & Monthly AI Reports**: Transmits task statistics (total completions, per-category completions, day-of-week and time-of-day completion distributions, streak status, week-over-week/month-over-month changes, and other aggregated data), category names and tips from the previous report to generate achievement summaries and personalized tips
   - **Recurring Pattern Analysis**: Transmits task titles, scheduled days and times, category names, and previous suggestions with whether they were accepted or declined to detect recurring patterns and generate suggestions
   - To-do parsing and memo organizing also transmit category names and the current date and time zone so dates and categories are organized correctly.
2. Only the data items specified above are transmitted; personally identifiable information such as email addresses, names and friend information is not transmitted.
3. Transmitted data is processed solely for the purpose of generating AI responses. The Company does not use this data for advertising or marketing purposes without separate consent.
4. Details regarding data processing by the external AI service are subject to the privacy policy of the respective provider (Google).
5. From app version 1.13.0, the Company asks Members for **AI data sharing consent** before they use AI features, and processes AI features requested in the app only for Members who have agreed. How to agree and withdraw, and how scheduled features are handled, are described in the "AI data sharing consent notice" below.

---

## Article 9 (Automated Decision-Making)

1. The Service may perform the following **automated decisions** using AI and automation technologies:
   - Automatic parsing of to-do text (extracting title, date, category, etc.)
   - Automatic generation of weekly and monthly AI reports (for premium users)
   - Recurring pattern detection and automatic task suggestions (for premium users)
   - Automatic to-do reminder delivery (1 hour and 10 minutes before the scheduled time)
   - Feature usage restrictions based on subscription status (daily usage limits, etc.)
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
   | **Firebase Crashlytics** | App error tracking, stability improvement | Error/crash logs, device information, OS version |
   | **Sentry** | App and server error tracking, stability monitoring | Error logs, request information, device information, replays of the screen where an error occurred (text and images are masked) |

2. **Behavioral Information Collection Notice**: The Company collects Members' in-app behavioral information (screen views, feature usage patterns, etc.) through Firebase Analytics for service improvement.
3. **How to Opt Out**: Users may restrict analytics data sharing through device settings or opt out by uninstalling the app. However, opting out may limit service quality improvements.

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
   - Request **account withdrawal**
   - Request **personal information transfer** (right to data portability under Article 35-2 of the Personal Information Protection Act)
2. **Data Portability Notice**: Users may request that their personal information be transferred to themselves or a third party. The Company shall inform users of the scope of transferable personal information and transfer formats in accordance with the Personal Information Protection Act and related enforcement decrees.
3. Rights may be exercised in writing, via email (matthew@redband.co.kr), or through in-app settings. The Company shall take action without delay.
   - **Account withdrawal (account deletion)**: Available directly in the app: open the **Me** tab and tap **Delete Account** at the bottom. If you can't use the app, you can request deletion by email by following [How to request account deletion](/en/account-deletion).
   - **Withdrawing AI data sharing consent**: You can withdraw at any time in the app's settings under **Terms & Policies**. After you withdraw, no data is sent for AI features; to-dos you've already created stay as they are.
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
- Infrastructure operated on cloud services (AWS, etc.), with physical security governed by the cloud provider's policies

---

## Article 14 (Personal Information of Children Under 14)

1. The Service is **not intended for children under 14**, and the Company does not accept membership registration from children under 14.
2. During registration, users confirm that they are 14 or older through the terms agreement process, and registration is restricted for users under 14.
3. If the Company becomes aware that personal information of a child under 14 has been collected, it shall destroy such information without delay.

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
2. In case of significant changes, the Company shall provide at least **7 days' prior notice** through in-app announcements or push notifications before the effective date.
3. For changes that significantly affect users' rights, at least **30 days' prior notice** shall be given through individual notification (email or push notification).

---

## Addendum

1. This Privacy Policy takes effect on **March 13, 2026**.
2. The previous Privacy Policy (effective March 10, 2026) shall cease to have effect upon the implementation of this Policy.

---

## Official website analytics notice (added October 4, 2026)

This notice applies to analytics on the official aido.kr website. Use **Website analytics settings** at the bottom of the website to allow or decline analytics. Analytics starts only after you allow it. Declining does not limit access to content or store links. Your choice is saved in your browser for 180 days and can be changed at any time. Analytics does not start when your browser sends a Do Not Track or Global Privacy Control signal.

- **Google Analytics 4 (Google LLC)** measures page visits, referral sources, campaigns, language, feature guide card selections and store button clicks to improve the website. After consent, it uses analytics cookies and Google processes visit, device and browser information. This website tag does not use advertising personalization or Google Signals. A store button click does not mean an app installation or purchase.
- **Vercel Web Analytics (Vercel Inc.)** provides cookie-free visit statistics after consent. It processes page, referral source, device and browser information.
- We do not add member identifiers, email addresses, to-do or note content, arbitrary URL queries or fragments to analytics events. Campaign UTM values are limited to a defined format.
- Selecting **Decline** stops tracking and clears this site's Google Analytics cookies. Previously collected data is handled according to each analytics service's retention settings. Changing your choice does not delete historical data.

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

---

## AI data sharing consent notice (added October 26, 2026)

From app version 1.13.0, before you first use an AI feature, such as turning a memo into to-dos, organizing a to-do you typed or spoke, or AI reports and recurring to-do suggestions, the app asks whether the following may be sent to Google Gemini.

| Item | Details |
|------|---------|
| What we send | The sentence or memo you entered (for voice, the text your device converted it to), category names, and the current date and time zone. For AI reports, to-do statistics and category names for that period and tips from the previous report; for recurring suggestions, to-do titles, scheduled days and times, and your responses to earlier suggestions |
| What we don't send | Information that directly identifies you, such as your name, email or friends |
| Recipient | Google LLC (Gemini API, United States) |
| Use | Organizing to-dos and generating AI reports and recurring to-do suggestions. Never used for advertising or marketing |
| Retention | Processed under Articles 7 and 8; Google deletes it as soon as API processing is complete (per Google's policy) |

- **Consent record**: When you agree or withdraw, we store your choice, the notice version and when you agreed. If the notice changes, we ask you to agree to the new version. A withdrawal stays in place even if the notice changes.
- **Not now, declining and withdrawal**: If you tap **Not now**, nothing is saved, only that AI feature doesn't run, and we'll ask again the next time you use an AI feature. Even without consent you can sign up, add to-dos yourself and use everything else. Even if you have never agreed, you can choose not to agree at any time in the app's settings under **Terms & Policies**, and after agreeing you can withdraw at any time. To-dos you've already created stay as they are.
- **App version 1.13.0 or later**: AI parsing of to-dos and memos, and scheduled AI reports and suggestions, send data to Google Gemini only for Members who have **agreed (AGREED)**. Nothing is sent if you haven't agreed, haven't chosen yet, or have withdrawn.
- **Scheduled features**: Weekly and monthly AI reports and recurring to-do suggestions for Premium Members are prepared by our server on a schedule. For Members who haven't agreed, reports are built from to-do statistics alone without Google Gemini, and recurring suggestions aren't created. Reports and suggestions that were already generated remain viewable.
- **How the app version is determined**: For features you request, we use the app version in the app's request header; for scheduled features, we use the latest app version recorded for your account and devices.
- **App versions below 1.13.0**: Members who only use an older app, which has no consent screen, are processed as before unless they have chosen not to agree. If you don't want this, you can choose not to agree in the app's settings or ask us to stop processing under Article 12 by emailing matthew@redband.co.kr.

This notice is published in advance on October 26, 2026 and applies from the day the app starts asking for AI data sharing consent (the release date of app version 1.13.0).
