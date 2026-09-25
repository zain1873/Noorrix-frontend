# Noorrix Chat Bot — Plan (Groq AI)

Yeh file batati hai ke chat bot ko asli AI banane ka kaam kin hisson (phases) mein hoga.
Har phase alag se banega aur test hoga, phir agla shuru hoga.

---

## Abhi kya hai?

- Chat bot ka design ban chuka hai (neeche right corner mein pink button).
- WhatsApp button hide hai (code mojood hai, sirf chupaya hua hai).
- Bot ab **asli AI** hai (Groq, model `openai/gpt-oss-120b`) — Phase 1 mukammal.

---

## Kaam kaise chalega? (Flow)

```
Customer message likhta hai
        ↓
Chat bot (website) message server ko bhejta hai
        ↓
Server (Next.js /api/chat):
   1. Message check karta hai (bohat lamba to nahi, spam to nahi)
   2. Django se current cars ki list leta hai
   3. Groq AI ko bhejta hai: "Tum Noorrix ke assistant ho, yeh humari cars hain..."
        ↓
Groq AI jawab banata hai
        ↓
Jawab word by word chat mein aata hai
```

**Zaroori baat:** Groq ki API key sirf server pe rahegi (`.env.local` mein).
Customer ke browser mein kabhi nahi jayegi.

---

## Phase 0 — Tayyari (aap ka kaam) ✅

- [x] console.groq.com pe free account banayein
- [x] Wahan se **API key** banayein
- [x] `.env.local` file mein yeh line daalein:
      `GROQ_API_KEY=aap_ki_key_yahan`
- [x] Key kisi ko chat / WhatsApp pe na bhejein, aur GitHub pe push na karein

---

## Phase 1 — Bot ko asli AI banana (sab se zaroori) ✅

**Maqsad:** Bot har sawal ka samajhdaar jawab de.

- [x] Server pe naya route banana: `src/app/api/chat/route.js`
- [x] Bot ko Noorrix ki info dena (naam, phone, email, services)
- [x] Bot ko **live stock** dena — Django se cars ki list, taake sahi price aur link bataye
- [x] Rules lagana:
  - Sirf Noorrix aur cars ke baare mein baat kare
  - Jo car stock mein nahi, woh na banaye
  - Price ya deal ka jhoota wada na kare
  - Samajh na aaye to phone number de
- [x] Jawab word by word aaye (typing jaisa)
- [x] Agar Groq kaam na kare to error ki bajaye: "Humein call karein 07300 503113"
- [x] Spam se bachao: ek banda thori der mein zyada messages na bhej sake

**Test kaise karein:**
- "Automatic car hai £8000 se kam?" → stock se sahi cars bataye
- "Aap ka address kya hai?" → sahi info de
- "Mujhe poem likh do" → politely mana kare, cars ki taraf laaye

---

## Phase 2 — Customer ka number lena (business ke liye sab se faida mand)

**Maqsad:** Interested customer ki details aap ki team tak pohanchein.

- [ ] Customer kisi car mein interest dikhaye to bot naam aur phone maange
- [ ] Details existing contact system (`/api/contact`) se team ko email ho jayein
- [ ] Customer ko confirm message: "Shukriya! Humari team jald call karegi"

**Test kaise karein:**
- Chat mein naam aur number dein → team ko email aaye

---

## Phase 3 — Chat ko behtar dikhana

**Maqsad:** Chat zyada professional aur useful lage.

- [ ] Bot car suggest kare to chat mein **car card** aaye (photo, price, "View details" button)
- [ ] "Team se baat karein" button (WhatsApp pe le jaye)

---

## Phase 4 — Extra (baad mein, zaroori nahi)

- [ ] Page badalne pe chat yaad rahe (gayab na ho)
- [ ] Customer kisi car ki page pe ho to bot ko pata ho ke woh kaun si car dekh raha hai
- [ ] Saari chats Django mein save hon, taake dekh sakein log kya pooch rahe hain

---

## Kaun si files banengi / badlengi

| File | Kya hoga |
|---|---|
| `src/app/api/chat/route.js` | **Naya** — server jo Groq ko call karega |
| `src/lib/chatPrompt.js` | **Naya** — bot ke rules aur cars ki list |
| `src/components/ChatBot/ChatBot.jsx` | Fixed jawab hata ke asli AI se jodna |
| `.env.local` | Groq key |

---

## Groq free plan ke baare mein

- Free hai, lekin **limit** hai (ek minute / ek din mein kitne messages).
- Chhoti website ke liye kaafi hai.
- Limit khatam ho to bot khud phone number dikha dega (Phase 1 mein handle hoga).
