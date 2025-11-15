import Map from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Clock,
  Filter,
  Heart,
  MapPin,
  Search,
  Send,
  Share2,
  Star,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "أحمد المسافر",
      message:
        "زرت الحضر الأسبوع الماضي، مكان مذهل حقاً! التاريخ يتحدث من كل حجر.",
      timestamp: "2024-11-10",
      likes: 12,
    },
    {
      id: 2,
      author: "فاطمة الأثرية",
      message:
        "بابل في الصباح الباكر تجربة لا تُنسى. أنصح بالزيارة قبل شروق الشمس.",
      timestamp: "2024-11-09",
      likes: 8,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const destinationsRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "كنوز العراق المخفية",
          text: "اكتشف المواقع الأثرية المذهلة في العراق",
          url: window.location.href,
        })
        .then(() => toast.success("تمت المشاركة بنجاح!"))
        .catch((error) => console.error("خطأ في المشاركة:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط إلى الحافظة!");
    }
  };

  const toggleFavorite = (id: number) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
      toast.info("تمت الإزالة من المفضلة");
    } else {
      updatedFavorites = [...favorites, id];
      toast.success("تمت الإضافة إلى المفضلة!");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const scrollToDestinations = () => {
    destinationsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    { id: "all", name: "جميع المواقع", color: "bg-primary" },
    { id: "ancient", name: "المدن القديمة", color: "bg-accent" },
    { id: "religious", name: "المواقع الدينية", color: "bg-secondary" },
    {
      id: "archaeological",
      name: "المواقع الأثرية",
      color: "bg-muted-foreground",
    },
    { id: "islamic", name: "التراث الإسلامي", color: "bg-primary" },
  ];

  const destinations = [
    {
      id: 1,
      name: "الحضر",
      englishName: "Hatra",
      category: "ancient",
      period: "القرن الثالث ق.م - القرن الثالث م",
      location: "محافظة نينوى",
      coordinates: "35.5889°N, 42.7189°E",
      description:
        "مدينة أثرية عظيمة كانت عاصمة مملكة الحضر، تشتهر بمعمارها الفريد الذي يمزج بين الطرز الهلنستية والرومانية والفارسية.",
      fullDescription:
        "الحضر مدينة أثرية تقع في صحراء الجزيرة العراقية، على بعد 110 كم جنوب غرب الموصل. كانت عاصمة مملكة الحضر التي ازدهرت في القرون الأولى للميلاد. تتميز المدينة بأسوارها الدائرية الضخمة وقصورها ومعابدها المزينة بالنقوش والتماثيل الرائعة. أدرجت اليونسكو الحضر في قائمة التراث العالمي عام 1985 لقيمتها التاريخية والمعمارية الاستثنائية.",
      highlights: [
        "المعبد الكبير بأعمدته الشاهقة",
        "القصر الملكي بزخارفه المتقنة",
        "الأسوار الدائرية المحصنة",
        "التماثيل والنقوش الآرامية",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "4-6 ساعات",
        difficulty: "متوسط",
        facilities: "مركز زوار، مرشدين محليين",
      },
      image:
        "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/0811/130922/1000w_q95.jpg",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: "أور",
      englishName: "Ur",
      category: "ancient",
      period: "الألف الرابع ق.م - القرن السادس ق.م",
      location: "محافظة ذي قار",
      coordinates: "30.9625°N, 46.1030°E",
      description:
        "مدينة سومرية عريقة، مسقط رأس النبي إبراهيم عليه السلام، تضم زقورة أور الشهيرة والمقبرة الملكية.",
      fullDescription:
        "أور من أقدم المدن في التاريخ البشري، تقع بالقرب من الناصرية في جنوب العراق. كانت مركزاً مهماً للحضارة السومرية وعاصمة لإمبراطورية أور الثالثة. تشتهر المدينة بزقورتها العظيمة التي بناها الملك أور-نامو، والمقبرة الملكية التي اكتشف فيها علماء الآثار كنوزاً ذهبية نادرة تعكس ثراء وتطور هذه الحضارة القديمة.",
      highlights: [
        "زقورة أور المدرجة",
        "المقبرة الملكية وكنوزها",
        "بيت النبي إبراهيم التقليدي",
        "متحف أور الأثري",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "3-5 ساعات",
        difficulty: "سهل",
        facilities: "متحف، مركز زوار، مقهى",
      },
      image:
        "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/1011/339517/500h_q95.jpg",
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      name: "سامراء",
      englishName: "Samarra",
      category: "islamic",
      period: "القرن التاسع الميلادي",
      location: "محافظة صلاح الدين",
      coordinates: "34.1975°N, 43.8742°E",
      description:
        "العاصمة العباسية التاريخية، تضم الجامع الكبير بمئذنته الحلزونية الشهيرة والمرقدين المقدسين.",
      fullDescription:
        'سامراء مدينة تاريخية تقع على نهر دجلة شمال بغداد، كانت عاصمة الخلافة العباسية لفترة من الزمن في القرن التاسع الميلادي. تشتهر المدينة بجامعها الكبير الذي يعد من أكبر المساجد في العالم، ومئذنته الحلزونية الفريدة "الملوية". كما تضم مرقدي الإمامين علي الهادي والحسن العسكري، مما يجعلها مركزاً مهماً للحج الشيعي.',
      highlights: [
        "الجامع الكبير والمئذنة الحلزونية",
        "مرقد الإمام علي الهادي",
        "مرقد الإمام الحسن العسكري",
        "قصر الخليفة المعتصم",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "5-7 ساعات",
        difficulty: "سهل",
        facilities: "مراكز زوار، مطاعم، فنادق",
      },
      image:
        "https://media.istockphoto.com/id/2042629573/photo/abu-dulaf-samarra-iraq.webp?s=2048x2048&w=is&k=20&c=ZutnUmK17tAxc1vryAVaZcNawRISd4Fjl_KXJ5OnRp8=",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: "بابل",
      englishName: "Babylon",
      category: "ancient",
      period: "الألف الثاني ق.م - القرن السابع م",
      location: "محافظة بابل",
      coordinates: "32.5355°N, 44.4275°E",
      description:
        "المدينة الأسطورية التي حكمها نبوخذ نصر وحمورابي، موطن حدائق بابل المعلقة وبرج بابل.",
      fullDescription:
        "بابل من أعظم مدن العالم القديم، تقع على نهر الفرات جنوب بغداد. كانت عاصمة الإمبراطورية البابلية وشهدت عهداً ذهبياً في عهد الملك نبوخذ نصر الثاني. اشتهرت بحدائقها المعلقة إحدى عجائب الدنيا السبع، وببرج بابل الأسطوري، وبشريعة حمورابي أقدم القوانين المكتوبة في التاريخ. اليوم يمكن للزوار استكشاف أطلال هذه المدينة العظيمة ومتحفها الذي يضم آثاراً نادرة.",
      highlights: [
        "بوابة عشتار المعاد بناؤها",
        "أطلال القصر الجنوبي",
        "موقع حدائق بابل المعلقة",
        "متحف بابل الأثري",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "4-6 ساعات",
        difficulty: "متوسط",
        facilities: "متحف، مرشدين، مقهى",
      },
      image:
        "https://images.unsplash.com/photo-1610303309510-8e603e3abcdb?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      reviews: 167,
    },
    {
      id: 5,
      name: "نوزي",
      englishName: "Nuzi",
      category: "archaeological",
      period: "الألف الثاني ق.م",
      location: "محافظة كركوك",
      coordinates: "35.4681°N, 44.3922°E",
      description:
        "موقع أثري مهم يحتوي على آلاف الألواح المسمارية التي تكشف تفاصيل الحياة اليومية في العصر البابلي القديم.",
      fullDescription:
        "نوزي موقع أثري يقع بالقرب من كركوك، كان مدينة مزدهرة في الألف الثاني قبل الميلاد. اكتشف علماء الآثار في هذا الموقع أكثر من 5000 لوح مسماري يوثق تفاصيل دقيقة عن الحياة الاقتصادية والاجتماعية والقانونية في تلك الفترة. هذه الألواح تعتبر كنزاً معرفياً يساعد في فهم تطور الحضارة في بلاد الرافدين.",
      highlights: [
        "أرشيف الألواح المسمارية",
        "أطلال المعابد والبيوت",
        "ورش الحرفيين القديمة",
        "نظام الري المتطور",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "2-3 ساعات",
        difficulty: "سهل",
        facilities: "مرشد محلي، لوحات تعريفية",
      },
      image: "https://farm3.static.flickr.com/2541/4467742792_548fbeb6b7_o.jpg",
      rating: 4.3,
      reviews: 89,
    },
    {
      id: 6,
      name: "الأخيضر",
      englishName: "Al-Ukhaidir",
      category: "islamic",
      period: "القرن الثامن الميلادي",
      location: "محافظة كربلاء",
      coordinates: "32.2644°N, 43.5847°E",
      description:
        "قصر صحراوي عباسي محفوظ بشكل رائع، يمثل تحفة معمارية إسلامية في قلب الصحراء.",
      fullDescription:
        "قصر الأخيضر تحفة معمارية إسلامية تقع في صحراء كربلاء، بني في القرن الثامن الميلادي في العصر العباسي المبكر. يتميز القصر بحالة حفظ استثنائية وتصميم معماري فريد يجمع بين العناصر الساسانية والبيزنطية والإسلامية. يضم القصر قاعات استقبال فخمة، وحمامات، ومسجداً، وحدائق، مما يعكس نمط الحياة الأرستقراطية في العصر العباسي.",
      highlights: [
        "القاعة الكبرى بقبابها المزخرفة",
        "الحمامات العربية التقليدية",
        "المسجد الملحق بالقصر",
        "نظام التهوية المتطور",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-4 ساعات",
        difficulty: "سهل",
        facilities: "مرشد، مركز زوار صغير",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Al-Akhdar_Castle.jpg/250px-Al-Akhdar_Castle.jpg",
      rating: 4.5,
      reviews: 112,
    },
    {
      id: 7,
      name: "نينوى",
      englishName: "Nineveh",
      category: "ancient",
      period: "الألف السابع ق.م - 612 ق.م",
      location: "محافظة نينوى",
      coordinates: "36.3667°N, 43.1500°E",
      description:
        "عاصمة الإمبراطورية الآشورية الحديثة، كانت أكبر مدينة في العالم في عصرها، وتشتهر بأسوارها الضخمة ومكتبة آشور بانيبال.",
      fullDescription:
        "نينوى، الواقعة على الضفة الشرقية لنهر دجلة في الموصل، كانت واحدة من أعظم مدن العالم القديم وعاصمة الإمبراطورية الآشورية في أوج قوتها. اشتهرت المدينة بأسوارها المنيعة التي امتدت لمسافة 12 كيلومترًا، وبواباتها المهيبة مثل بوابة نرجال. كما ضمت قصوراً فخمة مثل قصر سنحاريب الذي لا يضاهى، ومكتبة آشور بانيبال الشهيرة التي حوت آلاف الألواح المسمارية في شتى فروع المعرفة.",
      highlights: [
        "بوابة نرجال المعاد بناؤها جزئياً",
        "أطلال قصر سنحاريب",
        "موقع مكتبة آشور بانيبال",
        "الأسوار الآشورية القديمة",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "3-5 ساعات",
        difficulty: "متوسط",
        facilities: "مرشدين محليين، لوحات إرشادية",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nineveh_-_Mashki_Gate.jpg/250px-Nineveh_-_Mashki_Gate.jpg",
      rating: 4.7,
      reviews: 195,
    },
    {
      id: 8,
      name: "نمرود",
      englishName: "Nimrud",
      category: "ancient",
      period: "القرن الثالث عشر ق.م - 612 ق.م",
      location: "محافظة نينوى",
      coordinates: "36.0972°N, 43.3294°E",
      description:
        "مدينة آشورية قديمة وعاصمة ثانية للإمبراطورية، تشتهر بكنوزها العاجية وقصر آشور ناصربال الثاني.",
      fullDescription:
        'نمرود، التي عرفت قديماً باسم "كالح"، كانت مدينة آشورية رئيسية تقع جنوب نينوى. بلغت ذروة مجدها في عهد الملك آشور ناصربال الثاني الذي جعلها عاصمة إمبراطوريته وشيد فيها قصراً ضخماً مزيناً بالنقوش البارزة والمنحوتات الرائعة. اكتشف في الموقع كنوز نمرود الشهيرة، وهي مجموعة مذهلة من المجوهرات الذهبية والعاجيات التي تعكس فخامة البلاط الآشوري.',
      highlights: [
        "أطلال قصر آشور ناصربال الثاني",
        "الزقورة الآشورية",
        "موقع اكتشاف كنوز نمرود",
        "الثيران المجنحة (اللاماسو)",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "2-4 ساعات",
        difficulty: "متوسط",
        facilities: "مركز زوار، حراسة أمنية",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Iraq%3B_Nimrud_-_Assyria%2C_Lamassu%27s_Guarding_Palace_Entrance.jpg/250px-Iraq%3B_Nimrud_-_Assyria%2C_Lamassu%27s_Guarding_Palace_Entrance.jpg",
      rating: 4.6,
      reviews: 142,
    },
    {
      id: 9,
      name: "قطيسفون (المدائن)",
      englishName: "Ctesiphon",
      category: "archaeological",
      period: "القرن الثاني ق.م - القرن السابع م",
      location: "محافظة بغداد",
      coordinates: "33.0939°N, 44.5808°E",
      description:
        "عاصمة الإمبراطوريتين الفرثية والساسانية، وتشتهر بطاق كسرى، أكبر قوس مبني من الطوب في العالم.",
      fullDescription:
        'قطيسفون، أو المدائن كما تعرف في المصادر العربية، كانت مدينة عظيمة على نهر دجلة جنوب شرق بغداد. كانت عاصمة للإمبراطورية الفرثية ثم الساسانية لقرون عديدة. أبرز ما تبقى من هذه المدينة هو "طاق كسرى"، وهو إيوان ضخم كان جزءاً من قصر الحكم الساساني ويعتبر أكبر قوس مبني من الطوب غير المدعم في العالم، شاهداً على عظمة العمارة الساسانية.',
      highlights: [
        "طاق كسرى الشاهق",
        "أطلال القصر الأبيض",
        "بقايا المدينة القديمة",
        "متحف المدائن (إن وجد)",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع مفتوح، لوحات تعريفية",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/001125-TaqKasra-Iraq-IMG_7945-2.jpg/500px-001125-TaqKasra-Iraq-IMG_7945-2.jpg",
      rating: 4.8,
      reviews: 215,
    },
    {
      id: 15,
      name: "كيش",
      englishName: "Kish",
      category: "ancient",
      period: "الألف الرابع ق.م - القرن الثاني م",
      location: "محافظة بابل",
      coordinates: "32.5500°N, 44.6000°E",
      description:
        "مدينة سومرية قديمة جداً، تعتبر في قائمة الملوك السومريين أول مدينة حكمتها سلالة بعد الطوفان العظيم.",
      fullDescription:
        "كيش، الواقعة بالقرب من بابل، كانت مدينة ذات نفوذ سياسي وديني كبير في فجر الحضارة السومرية. بحسب قائمة الملوك السومريين، كانت كيش أول مدينة تستعيد الملكية بعد الطوفان، مما يمنحها مكانة أسطورية. كشفت الحفريات عن قصور ومعابد ومقبرة ملكية مبكرة، مما يدل على أهميتها وثروتها في الألفية الثالثة قبل الميلاد.",
      highlights: [
        'أطلال الزقورة "خورساجكالاما"',
        "المقبرة الملكية القديمة",
        "بقايا القصور السومرية",
        "المدينة الأثرية الواسعة",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-3 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري مفتوح، يتطلب مرشد",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Abanbar_in_kish_island.JPG/250px-Abanbar_in_kish_island.JPG",
      rating: 4.5,
      reviews: 95,
    },
    {
      id: 16,
      name: "لجش",
      englishName: "Lagash",
      category: "ancient",
      period: "الألف الخامس ق.م - القرن الثاني ق.م",
      location: "محافظة ذي قار",
      coordinates: "31.4167°N, 46.4000°E",
      description:
        "دولة مدينة سومرية قوية، اشتهرت في عهد حاكمها غوديا، الذي ترك وراءه العديد من التماثيل والنصوص.",
      fullDescription:
        "لجش كانت واحدة من أقدم وأكبر المدن في سومر. وصلت إلى ذروة قوتها في الألفية الثالثة قبل الميلاد. تشتهر المدينة بشكل خاص بفترة حكم غوديا، الذي كان راعياً عظيماً للفنون والعمارة. تم العثور على العديد من التماثيل الرائعة له، مصنوعة من الديوريت الصلب، بالإضافة إلى نصوص طويلة تسجل بناءه للمعابد. كانت لجش مركزاً تجارياً وثقافياً مهماً.",
      highlights: [
        'موقع معبد "إينينو"',
        "تماثيل غوديا (في المتاحف العالمية)",
        "أرشيف الألواح المسمارية",
        "بقايا نظام الري القديم",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-4 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري واسع، لا توجد خدمات",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Relief_Ur-Nanshe_Louvre_AO2344.jpg/250px-Relief_Ur-Nanshe_Louvre_AO2344.jpg",
      rating: 4.4,
      reviews: 80,
    },
    {
      id: 17,
      name: "إشنونا",
      englishName: "Eshnunna",
      category: "ancient",
      period: "الألف الثالث ق.م - القرن الثامن عشر ق.م",
      location: "محافظة ديالى",
      coordinates: "33.4833°N, 44.7333°E",
      description:
        "مدينة قديمة مهمة في وادي ديالى، اشتهرت بقوانينها التي سبقت شريعة حمورابي.",
      fullDescription:
        'إشنونا (تل أسمر حالياً) كانت عاصمة دولة قوية في منطقة وادي ديالى. ازدهرت المدينة كمركز تجاري يربط بلاد ما بين النهرين بعيلام والمناطق الشرقية. من أهم اكتشافاتها مجموعة من القوانين تعرف باسم "قوانين إشنونا"، وهي واحدة من أقدم مجموعات القوانين المعروفة، وتسبق شريعة حمورابي الشهيرة بحوالي قرنين من الزمان. كما عثر في معابدها على تماثيل مميزة للمصلين.',
      highlights: [
        "موقع قوانين إشنونا",
        "أطلال القصر الحاكم",
        "معبد الإله تيشباك",
        "تماثيل المصلين (في المتاحف)",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-3 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري، يتطلب تصريحاً للزيارة",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Detail%2C_a_statuette_of_a_male_worshiper%2C_from_Tell_Asmar_%28ancient_Eshnunna%29%2C_Iraq%2C_Early_Dynastic_period%2C_2600-2350_BCE._Iraq_Museum%2C_Baghdad.jpg/120px-Detail%2C_a_statuette_of_a_male_worshiper%2C_from_Tell_Asmar_%28ancient_Eshnunna%29%2C_Iraq%2C_Early_Dynastic_period%2C_2600-2350_BCE._Iraq_Museum%2C_Baghdad.jpg",
      rating: 4.3,
      reviews: 65,
    },
    {
      id: 18,
      name: "أريدو",
      englishName: "Eridu",
      category: "ancient",
      period: "Ubaid",
      location: "محافظة ذي قار",
      coordinates: "30.810°N, 46.103°E",
      description:
        "واحدة من أقدم مدن بلاد ما بين النهرين. مركز عبادة الإله إنكي.",
      fullDescription:
        "تعتبر أريدو واحدة من أقدم المدن في بلاد ما بين النهرين، ووفقاً للتقاليد السومرية، كانت أول مدينة في العالم. كانت المركز الرئيسي لعبادة الإله إنكي، إله الماء والحكمة. كشفت الحفريات عن سلسلة من المعابد التي بنيت فوق بعضها البعض على مدى قرون.",
      highlights: [
        "أطلال المعابد القديمة",
        "موقع الزقورة",
        "بقايا المدينة القديمة",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Statue_of_a_standing_lion_from_Eridu%2C_Iraq%2C_c._mid-3rd_millennium_BCE._Iraq_Museum.jpg",

      rating: 4.2,
      reviews: 45,
    },
    {
      id: 19,
      name: "تل عبيد",
      englishName: "Tell Ubaid",
      category: "archaeological",
      period: "Ubaid",
      location: "محافظة ذي قار",
      coordinates: "30.969°N, 46.132°E",
      description: "الموقع النموذجي لفترة العبيد. مجتمع زراعي مبكر.",
      fullDescription:
        "تل عبيد هو الموقع الذي أعطى اسمه لفترة العبيد، وهي فترة حاسمة في تطور حضارة بلاد ما بين النهرين. كان الموقع عبارة عن مجتمع زراعي صغير، وقد تم العثور فيه على أدوات فخارية مميزة ومنازل من الطوب اللبن.",
      highlights: [
        "الفخار المميز لفترة العبيد",
        "بقايا المنازل القديمة",
        "الأدوات الحجرية",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image:
        "data:image/jpeg;base64,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",
      rating: 4.1,
      reviews: 30,
    },
    {
      id: 20,
      name: "تل أبو شهرين",
      englishName: "Tell Abu Shahrain",
      category: "archaeological",
      period: "Early Bronze Age",
      location: "محافظة ذي قار",
      coordinates: "30.800°N, 46.050°E",
      description: "احتلال متعدد الفترات مع بقايا سكنية وإدارية.",
      fullDescription:
        "تل أبو شهرين هو موقع أثري شهد احتلالاً متعدد الفترات، مع بقايا سكنية وإدارية. يقدم الموقع نظرة ثاقبة على تطور المستوطنات في جنوب بلاد ما بين النهرين.",
      highlights: [
        "الطبقات الأثرية المتعددة",
        "البقايا المعمارية",
        "القطع الفخارية",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEt1TadqGSH9LZw-ZGdJYtobJ2AOAFl0y25g&s",
      rating: 4.0,
      reviews: 25,
    },
    {
      id: 21,
      name: "تل اللحم",
      englishName: "Tell al-Lahm",
      category: "archaeological",
      period: "Early Dynastic to Old Babylonian",
      location: "محافظة ذي قار",
      coordinates: "30.983°N, 46.700°E",
      description: "مستوطنة إقليمية مع أدلة على هياكل المعابد.",
      fullDescription:
        "تل اللحم هو موقع مستوطنة إقليمية يعود تاريخها إلى فترة من سلالة أور الثالثة إلى العصر البابلي القديم. تم العثور على أدلة على وجود هياكل معابد، مما يشير إلى أهمية دينية محتملة للموقع.",
      highlights: ["بقايا هياكل المعابد", "الطبقات الأثرية", "القطع الفخارية"],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Statue_Gudea_Met_59.2.jpg/250px-Statue_Gudea_Met_59.2.jpg",
      rating: 4.0,
      reviews: 20,
    },
    {
      id: 22,
      name: "جرسو (تلو)",
      englishName: "Girsu (Tello)",
      category: "ancient",
      period: "Early Dynastic",
      location: "محافظة ذي قار",
      coordinates: "31.527°N, 46.176°E",
      description: "المركز الديني والاقتصادي للغاش. تم العثور على أرشيفات.",
      fullDescription:
        "كانت جرسو المركز الديني والاقتصادي لمدينة لجش السومرية. تم العثور في الموقع على أرشيفات مهمة من الألواح المسمارية، بالإضافة إلى منحوتات رائعة مثل مسلة النسور.",
      highlights: [
        "موقع مسلة النسور",
        "أرشيف الألواح المسمارية",
        "بقايا المعابد والقصور",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-3 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري واسع",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kingdom_of_Lagash_%2830658120300%29.jpg/250px-Kingdom_of_Lagash_%2830658120300%29.jpg",
      rating: 4.3,
      reviews: 55,
    },
    {
      id: 23,
      name: "لارسا (سنكرة)",
      englishName: "Larsa (Senkereh)",
      category: "ancient",
      period: "Old Babylonian",
      location: "محافظة ذي قار",
      coordinates: "31.062°N, 45.967°E",
      description: "مملكة بابلية قديمة مهمة. تم العثور على نقوش ملكية.",
      fullDescription:
        "كانت لارسا مملكة أمورية قوية في العصر البابلي القديم، وتنافست مع بابل على الهيمنة. اشتهرت المدينة بمعبدها المخصص لإله الشمس أوتو/شمش. تم العثور على العديد من النقوش الملكية التي توثق تاريخ المدينة.",
      highlights: [
        "أطلال معبد إبابار",
        "النقوش الملكية",
        "بقايا المدينة القديمة",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-3 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري واسع",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Worshipper_Larsa_Louvre_AO15704.jpg/250px-Worshipper_Larsa_Louvre_AO15704.jpg",
      rating: 4.2,
      reviews: 50,
    },
    {
      id: 24,
      name: "تل صفر",
      englishName: "Tell Sifr",
      category: "archaeological",
      period: "Early Dynastic",
      location: "محافظة ذي قار",
      coordinates: "31.083°N, 46.250°E",
      description: "تل إداري صغير به طبقات سكنية.",
      fullDescription:
        "تل صفر هو تل إداري صغير يعود إلى عصر فجر السلالات. يحتوي الموقع على طبقات سكنية تقدم لمحة عن الحياة اليومية في تلك الفترة.",
      highlights: ["الطبقات السكنية", "الأدوات الفخارية", "البقايا المعمارية"],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Contract_for_a_loan_of_silver_-_Tell_Sifr_BM_33257.jpg/250px-Contract_for_a_loan_of_silver_-_Tell_Sifr_BM_33257.jpg",
      rating: 3.9,
      reviews: 15,
    },
    {
      id: 25,
      name: "تل الفرس",
      englishName: "Tell al-Faras",
      category: "archaeological",
      period: "Early Bronze Age",
      location: "محافظة ذي قار",
      coordinates: "30.950°N, 46.300°E",
      description: "مستوطنة زراعية بها معالم للري.",
      fullDescription:
        "تل الفرس هو موقع مستوطنة زراعية من العصر البرونزي المبكر. تظهر في الموقع معالم واضحة لأنظمة الري القديمة، مما يدل على تطور الزراعة في المنطقة.",
      highlights: ["أنظمة الري القديمة", "الأدوات الزراعية", "بقايا المستوطنة"],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Warka_vase_%28background_retouched%29.jpg/250px-Warka_vase_%28background_retouched%29.jpg",
      rating: 4.0,
      reviews: 20,
    },
    {
      id: 26,
      name: "مارد (تل السعدوم)",
      englishName: "Marad (Tell as-Sadoum)",
      category: "ancient",
      period: "Old Babylonian",
      location: "محافظة بابل",
      coordinates: "32.245°N, 44.650°E",
      description: "مدينة صغيرة إلى متوسطة بها بقايا إدارية.",
      fullDescription:
        "كانت مارد مدينة صغيرة إلى متوسطة الحجم في العصر البابلي القديم. تم العثور في الموقع على بقايا إدارية تشير إلى دورها كمركز محلي.",
      highlights: ["البقايا الإدارية", "الألواح المسمارية", "القطع الفخارية"],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع أثري مفتوح",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uruk3000BCE.jpg/250px-Uruk3000BCE.jpg",
      rating: 4.0,
      reviews: 30,
    },
    {
      id: 27,
      name: "إيسن",
      englishName: "Isin",
      category: "ancient",
      period: "Isin-Larsa",
      location: "محافظة القادسية",
      coordinates: "32.333°N, 44.000°E",
      description: "عاصمة سلالة إيسن. تشتهر بالنشاط القانوني والبنائي.",
      fullDescription:
        "بعد سقوط سلالة أور الثالثة، برزت إيسن كقوة مهيمنة في بلاد ما بين النهرين وأسست سلالة حاكمة. اشتهرت المدينة بقوانينها ونشاطها البنائي الواسع.",
      highlights: [
        "موقع قوانين إيسن",
        "بقايا المباني العامة",
        "الألواح المسمارية",
      ],
      visitInfo: {
        bestTime: "نوفمبر - مارس",
        duration: "2-3 ساعات",
        difficulty: "متوسط",
        facilities: "موقع أثري واسع",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Hymn_Iddin-Dagan_Louvre_AO8864.jpg/250px-Hymn_Iddin-Dagan_Louvre_AO8864.jpg",
      rating: 4.2,
      reviews: 40,
    },
    {
      id: 28,
      name: "مخيم الإمام الحسين",
      englishName: "Al-Mukhayam Shrine",
      category: "religious",
      period: "القرن السابع",
      location: "محافظة كربلاء",
      coordinates: "32.6169°N, 44.0322°E",
      description: "الموقع التقليدي لمخيم الإمام الحسين خلال معركة كربلاء.",
      fullDescription:
        "مخيم الإمام الحسين هو المكان الذي أقام فيه الإمام الحسين وأنصاره خيامهم خلال معركة كربلاء. يعتبر الموقع مكاناً للذكرى والتأمل، حيث يستحضر الزوار الأحداث المأساوية التي وقعت في هذا المكان.",
      highlights: [
        "الخيام الرمزية",
        "مكان إقامة صلاة الجماعة",
        "الأجواء الروحانية",
      ],
      visitInfo: {
        bestTime: "على مدار العام",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "مرافق دينية",
      },
      image:
        "data:image/jpeg;base64,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",
      rating: 4.7,
      reviews: 300,
    },
    {
      id: 29,
      name: "طاق الزعفراني",
      englishName: "Taq Al-Zafarani",
      category: "archaeological",
      period: "العصر العباسي",
      location: "محافظة كربلاء",
      coordinates: "32.6167°N, 44.0333°E",
      description: "معلم تاريخي حيث تلتقي التراث والروحانية.",
      fullDescription:
        "طاق الزعفراني هو معلم تاريخي يعود إلى العصر العباسي. يمثل القوس بقايا بوابة قديمة، ويتميز بتصميمه المعماري الفريد. يعتبر الموقع مثالاً رائعاً على العمارة الإسلامية المبكرة في العراق.",
      highlights: ["القوس العباسي", "الزخارف المعمارية", "الأهمية التاريخية"],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "1 ساعة",
        difficulty: "سهل",
        facilities: "موقع مفتوح",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSayyoYBGXI5YVeAwp5fuAHPwrd8UMiYHJcDA&s",
      rating: 4.4,
      reviews: 150,
    },
    {
      id: 30,
      name: "مقبرة وادي السلام",
      englishName: "Wadi Al-Salaam Cemetery",
      category: "religious",
      period: "أكثر من 1400 عام",
      location: "محافظة النجف",
      coordinates: "32.0000°N, 44.3167°E",
      description:
        "واحدة من أكبر المقابر في العالم، تضم رفات العديد من الأنبياء والعلماء.",
      fullDescription:
        "تعتبر مقبرة وادي السلام في النجف أكبر مقبرة في العالم، وتضم ملايين القبور. يعتقد أنها تضم رفات العديد من الأنبياء والأولياء والعلماء، مما يجعلها مكاناً ذا أهمية روحانية كبيرة. تتميز المقبرة بتنوع شواهد القبور وتصميمها الفريد.",
      highlights: [
        "ضريح النبي هود وصالح",
        "مقامات الأئمة",
        "المساحة الشاسعة للمقبرة",
      ],
      visitInfo: {
        bestTime: "على مدار العام",
        duration: "2-3 ساعات",
        difficulty: "سهل",
        facilities: "مرافق دينية",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Wadi-us-Salaam_20150218_35.jpg/250px-Wadi-us-Salaam_20150218_35.jpg",
      rating: 4.8,
      reviews: 900,
    },
    {
      id: 31,
      name: "مسجد الكوفة المعظم",
      englishName: "Great Mosque of Kufa",
      category: "religious",
      period: "القرن السابع",
      location: "محافظة النجف",
      coordinates: "32.0289°N, 44.4014°E",
      description:
        "أحد أقدم المساجد في الإسلام، وله أهمية كبيرة لدى المسلمين الشيعة.",
      fullDescription:
        "يعتبر مسجد الكوفة المعظم من أقدم وأهم المساجد في العالم الإسلامي. كان المسجد مركزاً مهماً للعلم والدين، وفيه استشهد الإمام علي بن أبي طالب. يضم المسجد مقامات للعديد من الأنبياء والأولياء، ويتميز بتصميمه المعماري الفريد.",
      highlights: [
        "محراب الإمام علي",
        "مقامات الأنبياء والأولياء",
        "صحن المسجد الواسع",
      ],
      visitInfo: {
        bestTime: "على مدار العام",
        duration: "2-3 ساعات",
        difficulty: "سهل",
        facilities: "مرافق دينية كاملة",
      },
      image:
        "https://www.traveladventures.org/countries/iraq/images/kufa-grand-mosque01.jpg",
      rating: 4.9,
      reviews: 1100,
    },
    {
      id: 32,
      name: "مسجد السهلة",
      englishName: "Al-Sahla Mosque",
      category: "religious",
      period: "القرن السابع",
      location: "محافظة النجف",
      coordinates: "32.0333°N, 44.3833°E",
      description:
        "مسجد تاريخي يعتقد أنه كان منزل العديد من الأنبياء، وله أهمية خاصة في عقيدة الشيعة.",
      fullDescription:
        "مسجد السهلة هو مسجد تاريخي يقع في الكوفة، ويعتقد أنه كان منزلاً للعديد من الأنبياء مثل إبراهيم وإدريس. للمسجد أهمية خاصة في عقيدة الشيعة، حيث يعتقد أنه سيكون مكان إقامة الإمام المهدي عند ظهوره.",
      highlights: [
        "مقام الإمام المهدي",
        "مقامات الأنبياء",
        "الأجواء الروحانية",
      ],
      visitInfo: {
        bestTime: "على مدار العام",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "مرافق دينية",
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjaJTIUdr5ww_vF9fCvsKmedUrHEYKidqTMA&s",
      rating: 4.8,
      reviews: 750,
    },
    {
      id: 33,
      name: "القصر العباسي",
      englishName: "Abbasid Palace",
      category: "islamic",
      period: "القرن الثاني عشر",
      location: "محافظة بغداد",
      coordinates: "33.3414°N, 44.3897°E",
      description:
        "أحد القصور القليلة المتبقية من العصر العباسي في بغداد، ويتميز بعمارته الإسلامية الرائعة.",
      fullDescription:
        "يعتبر القصر العباسي من أهم المعالم التاريخية في بغداد، وهو مثال نادر على العمارة العباسية. يتميز القصر بأقواسه المقرنصة وزخارفه الجصية المعقدة. يستخدم القصر حالياً كمتحف ومركز ثقافي.",
      highlights: ["الأقواس المقرنصة", "الزخارف الجصية", "الفناء المركزي"],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "متحف، مركز ثقافي",
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Inbound3876607660648875635%D8%A7%D8%AD%D8%AF_%D8%A7%D8%A8%D9%88%D8%A7%D8%A8_%D8%A7%D9%84%D9%82%D8%B5%D8%B1_%D8%A7%D9%84%D8%B9%D8%A8%D8%A7%D8%B3%D9%8A.jpg/330px-Inbound3876607660648875635%D8%A7%D8%AD%D8%AF_%D8%A7%D8%A8%D9%88%D8%A7%D8%A8_%D8%A7%D9%84%D9%82%D8%B5%D8%B1_%D8%A7%D9%84%D8%B9%D8%A8%D8%A7%D8%B3%D9%8A.jpg",
      rating: 4.6,
      reviews: 400,
    },
    {
      id: 34,
      name: "المدرسة المستنصرية",
      englishName: "Mustansiriya Madrasa",
      category: "islamic",
      period: "القرن الثالث عشر",
      location: "محافظة بغداد",
      coordinates: "33.3408°N, 44.3886°E",
      description:
        "واحدة من أقدم الجامعات في العالم، كانت مركزاً رئيسياً للعلم والمعرفة في العصر العباسي.",
      fullDescription:
        "كانت المدرسة المستنصرية جامعة شاملة تدرس فيها مختلف العلوم، من الطب والرياضيات إلى الفقه والحديث. تتميز المدرسة بتصميمها المعماري الفريد وساعتها المائية الشهيرة. تعتبر المدرسة شاهداً على ازدهار العلم في بغداد خلال العصر الذهبي للإسلام.",
      highlights: [
        "الساعة المائية",
        "الفناء المركزي والنافورات",
        "قاعات المحاضرات",
      ],
      visitInfo: {
        bestTime: "أكتوبر - أبريل",
        duration: "1-2 ساعات",
        difficulty: "سهل",
        facilities: "موقع تاريخي",
      },
      image:
        "https://iwh.icesco.org/wp-content/uploads/2024/11/The-Muntasiriya-Madrassa-.-Iraq-1-1024x679.jpg",
      rating: 4.7,
      reviews: 550,
    },
    {
      id: 35,
      name: "مرقد الكاظمين",
      englishName: "Al-Kadhimayn Shrine",
      category: "religious",
      period: "القرن الثامن",
      location: "محافظة بغداد",
      coordinates: "33.3750°N, 44.3417°E",
      description:
        "مرقد الإمامين موسى الكاظم ومحمد الجواد، وهو من أهم العتبات المقدسة لدى الشيعة.",
      fullDescription:
        "يقع مرقد الكاظمين في بغداد، وهو مجمع ديني ضخم يضم ضريحي الإمامين موسى الكاظم ومحمد الجواد. يتميز المرقد بقبابه الذهبية ومآذنه الشاهقة، ويعتبر تحفة فنية من العمارة الإسلامية. يجذب المرقد ملايين الزوار سنوياً.",
      highlights: ["القباب الذهبية", "الزخارف الإسلامية", "الأجواء الروحانية"],
      visitInfo: {
        bestTime: "على مدار العام",
        duration: "2-3 ساعات",
        difficulty: "سهل",
        facilities: "مرافق دينية كاملة",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Al-Kadhimiya_Mosque%2C_Kadhmain_Shrine.jpg/500px-Al-Kadhimiya_Mosque%2C_Kadhmain_Shrine.jpg",
      rating: 4.9,
      reviews: 1300,
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && authorName.trim()) {
      const message = {
        id: messages.length + 1,
        author: authorName,
        message: newMessage,
        timestamp: new Date().toISOString().split("T")[0],
        likes: 0,
      };
      setMessages([message, ...messages]);
      setNewMessage("");
      setAuthorName("");
      toast.success("تم إرسال رسالتك بنجاح!");
    } else {
      toast.error("يرجى ملء جميع الحقول");
    }
  };

  const handleLikeMessage = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
    toast.success("تم إعجابك بالرسالة!");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background archaeological-pattern"
    >
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  كنوز العراق المخفية
                </h1>
                <p className="text-muted-foreground">اكتشف القصص المنسية</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToDestinations()}
              >
                <Heart className="w-4 h-4 ml-2" />
                المفضلة
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section
          className="text-center mb-12 animate-fade-in-up rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url('/Generated Image November 14, 2025 - 9_36PM.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-12">
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              رحلة عبر التاريخ
            </h2>
            <p
              className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              استكشف المواقع الأثرية المذهلة في العراق، من المدن السومرية
              العريقة إلى القصور العباسية الفخمة. كل موقع يحكي قصة حضارة عظيمة
              شكلت تاريخ البشرية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="btn-archaeological"
                onClick={scrollToDestinations}
              >
                <Camera className="w-5 h-5 ml-2" />
                ابدأ الاستكشاف
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-ancient"
                onClick={scrollToMap}
              >
                <MapPin className="w-5 h-5 ml-2" />
                عرض الخريطة
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="ابحث عن موقع أثري..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 ml-2" />
              تصفية متقدمة
            </Button>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? category.color + " text-white"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </section>

        {/* Destinations Grid */}
        <section ref={destinationsRef} className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            المواقع الأثرية ({filteredDestinations.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group hover:shadow-archaeological transition-all duration-300 hover:-translate-y-2 ancient-texture"
              >
                <CardHeader className="p-0">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {destination.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {destination.englishName} • {destination.location}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(destination.id)}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(destination.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {destination.rating}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({destination.reviews} تقييم)
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-4">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{destination.visitInfo.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{destination.visitInfo.difficulty}</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full btn-archaeological">
                        استكشف التفاصيل
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-4xl max-h-[80vh] overflow-y-auto"
                      dir="rtl"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {destination.name}
                        </DialogTitle>
                        <DialogDescription>
                          {destination.englishName} • {destination.period}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">نبذة تاريخية</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {destination.fullDescription}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">
                              معلومات الزيارة
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  أفضل وقت للزيارة:
                                </span>
                                <span>{destination.visitInfo.bestTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  مدة الزيارة:
                                </span>
                                <span>{destination.visitInfo.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  مستوى الصعوبة:
                                </span>
                                <span>{destination.visitInfo.difficulty}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  الإحداثيات:
                                </span>
                                <span className="text-xs">
                                  {destination.coordinates}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">أبرز المعالم</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {destination.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            الخدمات المتوفرة
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {destination.visitInfo.facilities}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Message Board */}
        <section className="mb-8">
          <Card className="ancient-texture">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                لوحة رسائل المسافرين
              </CardTitle>
              <CardDescription>
                شارك تجربتك واقرأ قصص المسافرين الآخرين
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="messages" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="messages">الرسائل</TabsTrigger>
                  <TabsTrigger value="write">اكتب رسالة</TabsTrigger>
                </TabsList>

                <TabsContent value="messages" className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-medium">{message.author}</h5>
                            <p className="text-xs text-muted-foreground">
                              {message.timestamp}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikeMessage(message.id)}
                            className="flex items-center gap-1"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{message.likes}</span>
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed">
                          {message.message}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="write" className="space-y-4">
                  <div className="space-y-4">
                    <Input
                      placeholder="اسمك..."
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                    <Textarea
                      placeholder="شارك تجربتك في زيارة المواقع الأثرية..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={4}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="btn-archaeological"
                    >
                      <Send className="w-4 h-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Map Section */}
        <section ref={mapRef} className="mb-8">
          <Card className="ancient-texture">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                خريطة المواقع التفاعلية
              </CardTitle>
              <CardDescription>
                استكشف مواقع المواقع الأثرية على الخريطة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Map destinations={filteredDestinations} />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">كنوز العراق المخفية</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                منصة مخصصة لاستكشاف التراث الأثري العراقي العريق وتعريف العالم
                بكنوز الحضارة العراقية.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط مفيدة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    دليل المسافر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    نصائح السفر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    الأحداث والفعاليات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تابعنا</h4>
              <p className="text-sm text-muted-foreground mb-4">
                ابق على اطلاع بآخر الاكتشافات والأخبار الأثرية
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  فيسبوك
                </Button>
                <Button size="sm" variant="outline">
                  تويتر
                </Button>
                <Button size="sm" variant="outline">
                  إنستغرام
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 كنوز العراق المخفية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
