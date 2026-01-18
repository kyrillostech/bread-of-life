
const BIBLE_BOOKS = [
    {
        "id": 1,
        "name": "تكوين",
        "chapters": 50,
        "isOt": true
    },
    {
        "id": 2,
        "name": "خروج",
        "chapters": 40,
        "isOt": true
    },
    {
        "id": 3,
        "name": "لاويين",
        "chapters": 27,
        "isOt": true
    },
    {
        "id": 4,
        "name": "عدد",
        "chapters": 36,
        "isOt": true
    },
    {
        "id": 5,
        "name": "تثنية",
        "chapters": 34,
        "isOt": true
    },
    {
        "id": 6,
        "name": "يشوع",
        "chapters": 24,
        "isOt": true
    },
    {
        "id": 7,
        "name": "قضاة",
        "chapters": 21,
        "isOt": true
    },
    {
        "id": 8,
        "name": "راعوث",
        "chapters": 4,
        "isOt": true
    },
    {
        "id": 9,
        "name": "1 صموئيل",
        "chapters": 31,
        "isOt": true
    },
    {
        "id": 10,
        "name": "2 صموئيل",
        "chapters": 24,
        "isOt": true
    },
    {
        "id": 11,
        "name": "1 ملوك",
        "chapters": 22,
        "isOt": true
    },
    {
        "id": 12,
        "name": "2 ملوك",
        "chapters": 25,
        "isOt": true
    },
    {
        "id": 13,
        "name": "1 اخبار",
        "chapters": 29,
        "isOt": true
    },
    {
        "id": 14,
        "name": "2 اخبار",
        "chapters": 36,
        "isOt": true
    },
    {
        "id": 15,
        "name": "عزرا",
        "chapters": 10,
        "isOt": true
    },
    {
        "id": 16,
        "name": "نحميا",
        "chapters": 13,
        "isOt": true
    },
    {
        "id": 17,
        "name": "استير",
        "chapters": 10,
        "isOt": true
    },
    {
        "id": 18,
        "name": "ايوب",
        "chapters": 42,
        "isOt": true
    },
    {
        "id": 19,
        "name": "مزامير",
        "chapters": 150,
        "isOt": true
    },
    {
        "id": 20,
        "name": "امثال",
        "chapters": 31,
        "isOt": true
    },
    {
        "id": 21,
        "name": "جامعة",
        "chapters": 12,
        "isOt": true
    },
    {
        "id": 22,
        "name": "نشيدالانشاد",
        "chapters": 8,
        "isOt": true
    },
    {
        "id": 23,
        "name": "اشعياء",
        "chapters": 66,
        "isOt": true
    },
    {
        "id": 24,
        "name": "ارميا",
        "chapters": 52,
        "isOt": true
    },
    {
        "id": 25,
        "name": "مراثي",
        "chapters": 5,
        "isOt": true
    },
    {
        "id": 26,
        "name": "حزقيال",
        "chapters": 48,
        "isOt": true
    },
    {
        "id": 27,
        "name": "دانيال",
        "chapters": 12,
        "isOt": true
    },
    {
        "id": 28,
        "name": "هوشع",
        "chapters": 14,
        "isOt": true
    },
    {
        "id": 29,
        "name": "يوئيل",
        "chapters": 3,
        "isOt": true
    },
    {
        "id": 30,
        "name": "عاموس",
        "chapters": 9,
        "isOt": true
    },
    {
        "id": 31,
        "name": "عوبديا",
        "chapters": 1,
        "isOt": true
    },
    {
        "id": 32,
        "name": "يونان",
        "chapters": 4,
        "isOt": true
    },
    {
        "id": 33,
        "name": "ميخا",
        "chapters": 7,
        "isOt": true
    },
    {
        "id": 34,
        "name": "ناحوم",
        "chapters": 3,
        "isOt": true
    },
    {
        "id": 35,
        "name": "حبقوق",
        "chapters": 3,
        "isOt": true
    },
    {
        "id": 36,
        "name": "صفنيا",
        "chapters": 3,
        "isOt": true
    },
    {
        "id": 37,
        "name": "حجى",
        "chapters": 2,
        "isOt": true
    },
    {
        "id": 38,
        "name": "زكريا",
        "chapters": 14,
        "isOt": true
    },
    {
        "id": 39,
        "name": "ملاخي",
        "chapters": 4,
        "isOt": true
    },
    {
        "id": 40,
        "name": "متى",
        "chapters": 28,
        "isOt": false
    },
    {
        "id": 41,
        "name": "مرقس",
        "chapters": 16,
        "isOt": false
    },
    {
        "id": 42,
        "name": "لوقا",
        "chapters": 24,
        "isOt": false
    },
    {
        "id": 43,
        "name": "يوحنا",
        "chapters": 21,
        "isOt": false
    },
    {
        "id": 44,
        "name": "اعمال",
        "chapters": 28,
        "isOt": false
    },
    {
        "id": 45,
        "name": "رومية",
        "chapters": 16,
        "isOt": false
    },
    {
        "id": 46,
        "name": "1 كورنثوس",
        "chapters": 16,
        "isOt": false
    },
    {
        "id": 47,
        "name": "2 كورنثوس",
        "chapters": 13,
        "isOt": false
    },
    {
        "id": 48,
        "name": "غلاطية",
        "chapters": 6,
        "isOt": false
    },
    {
        "id": 49,
        "name": "افسس",
        "chapters": 6,
        "isOt": false
    },
    {
        "id": 50,
        "name": "فيلبي",
        "chapters": 4,
        "isOt": false
    },
    {
        "id": 51,
        "name": "كولوسي",
        "chapters": 4,
        "isOt": false
    },
    {
        "id": 52,
        "name": "1 تسالونيكي",
        "chapters": 5,
        "isOt": false
    },
    {
        "id": 53,
        "name": "2 تسالونيكي",
        "chapters": 3,
        "isOt": false
    },
    {
        "id": 54,
        "name": "1 تيموثاوس",
        "chapters": 6,
        "isOt": false
    },
    {
        "id": 55,
        "name": "2 تيموثاوس",
        "chapters": 4,
        "isOt": false
    },
    {
        "id": 56,
        "name": "تيطس",
        "chapters": 3,
        "isOt": false
    },
    {
        "id": 57,
        "name": "فليمون",
        "chapters": 1,
        "isOt": false
    },
    {
        "id": 58,
        "name": "عبرانيين",
        "chapters": 13,
        "isOt": false
    },
    {
        "id": 59,
        "name": "يعقوب",
        "chapters": 5,
        "isOt": false
    },
    {
        "id": 60,
        "name": "1 بطرس",
        "chapters": 5,
        "isOt": false
    },
    {
        "id": 61,
        "name": "2 بطرس",
        "chapters": 3,
        "isOt": false
    },
    {
        "id": 62,
        "name": "1 يوحنا",
        "chapters": 5,
        "isOt": false
    },
    {
        "id": 63,
        "name": "2 يوحنا",
        "chapters": 1,
        "isOt": false
    },
    {
        "id": 64,
        "name": "3 يوحنا",
        "chapters": 1,
        "isOt": false
    },
    {
        "id": 65,
        "name": "يهوذا",
        "chapters": 1,
        "isOt": false
    },
    {
        "id": 66,
        "name": "رؤيا",
        "chapters": 22,
        "isOt": false
    },
    {
        "id": 67,
        "name": "طوبيا",
        "chapters": 14,
        "isOt": true
    },
    {
        "id": 68,
        "name": "يهوديت",
        "chapters": 16,
        "isOt": true
    },
    {
        "id": 69,
        "name": "حكمة سليمان",
        "chapters": 19,
        "isOt": true
    },
    {
        "id": 70,
        "name": "يشوع بن سيراخ",
        "chapters": 51,
        "isOt": true
    },
    {
        "id": 71,
        "name": "باروخ",
        "chapters": 6,
        "isOt": true
    },
    {
        "id": 72,
        "name": "المكابيين الأول",
        "chapters": 16,
        "isOt": true
    },
    {
        "id": 73,
        "name": "المكابيين الثاني",
        "chapters": 15,
        "isOt": true
    }
];

// Helper to flatten chapters
function flattenChapters(books) {
    const chapters = [];
    books.forEach(b => {
        for (let c = 1; c <= b.chapters; c++) {
            chapters.push({
                bookId: b.id,
                bookName: b.name,
                chapter: c
            });
        }
    });
    return chapters;
}

const OT_BOOKS = BIBLE_BOOKS.filter(b => b.isOt);
const NT_BOOKS = BIBLE_BOOKS.filter(b => !b.isOt);

const OT_CHAPTERS = flattenChapters(OT_BOOKS);
const NT_CHAPTERS = flattenChapters(NT_BOOKS);
const ALL_CHAPTERS = flattenChapters(BIBLE_BOOKS);

// Stats
console.log('OT Chapters:', OT_CHAPTERS.length);
console.log('NT Chapters:', NT_CHAPTERS.length);
console.log('Total:', ALL_CHAPTERS.length);
