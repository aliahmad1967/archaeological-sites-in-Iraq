import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Users, Star, Send, Filter, Search, Heart, Share2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import Map from '@/components/Map';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'أحمد المسافر',
      message: 'زرت الحضر الأسبوع الماضي، مكان مذهل حقاً! التاريخ يتحدث من كل حجر.',
      timestamp: '2024-11-10',
      likes: 12
    },
    {
      id: 2,
      author: 'فاطمة الأثرية',
      message: 'بابل في الصباح الباكر تجربة لا تُنسى. أنصح بالزيارة قبل شروق الشمس.',
      timestamp: '2024-11-09',
      likes: 8
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const destinationsRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'كنوز العراق المخفية',
        text: 'اكتشف المواقع الأثرية المذهلة في العراق',
        url: window.location.href,
      })
        .then(() => toast.success('تمت المشاركة بنجاح!'))
        .catch((error) => console.error('خطأ في المشاركة:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('تم نسخ الرابط إلى الحافظة!');
    }
  };

  const toggleFavorite = (id: number) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(favId => favId !== id);
      toast.info('تمت الإزالة من المفضلة');
    } else {
      updatedFavorites = [...favorites, id];
      toast.success('تمت الإضافة إلى المفضلة!');
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const scrollToDestinations = () => {
    destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', name: 'جميع المواقع', color: 'bg-primary' },
    { id: 'ancient', name: 'المدن القديمة', color: 'bg-accent' },
    { id: 'religious', name: 'المواقع الدينية', color: 'bg-secondary' },
    { id: 'archaeological', name: 'المواقع الأثرية', color: 'bg-muted-foreground' },
    { id: 'islamic', name: 'التراث الإسلامي', color: 'bg-primary' }
  ];

  const destinations = [
    {
      id: 1,
      name: 'الحضر',
      englishName: 'Hatra',
      category: 'ancient',
      period: 'القرن الثالث ق.م - القرن الثالث م',
      location: 'محافظة نينوى',
      coordinates: '35.5889°N, 42.7189°E',
      description: 'مدينة أثرية عظيمة كانت عاصمة مملكة الحضر، تشتهر بمعمارها الفريد الذي يمزج بين الطرز الهلنستية والرومانية والفارسية.',
      fullDescription: 'الحضر مدينة أثرية تقع في صحراء الجزيرة العراقية، على بعد 110 كم جنوب غرب الموصل. كانت عاصمة مملكة الحضر التي ازدهرت في القرون الأولى للميلاد. تتميز المدينة بأسوارها الدائرية الضخمة وقصورها ومعابدها المزينة بالنقوش والتماثيل الرائعة. أدرجت اليونسكو الحضر في قائمة التراث العالمي عام 1985 لقيمتها التاريخية والمعمارية الاستثنائية.',
      highlights: [
        'المعبد الكبير بأعمدته الشاهقة',
        'القصر الملكي بزخارفه المتقنة', 
        'الأسوار الدائرية المحصنة',
        'التماثيل والنقوش الآرامية'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '4-6 ساعات',
        difficulty: 'متوسط',
        facilities: 'مركز زوار، مرشدين محليين'
      },
      image: 'https://www.dvidshub.net/image/5756953/hatra-iraq',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: 'أور',
      englishName: 'Ur',
      category: 'ancient',
      period: 'الألف الرابع ق.م - القرن السادس ق.م',
      location: 'محافظة ذي قار',
      coordinates: '30.9625°N, 46.1030°E',
      description: 'مدينة سومرية عريقة، مسقط رأس النبي إبراهيم عليه السلام، تضم زقورة أور الشهيرة والمقبرة الملكية.',
      fullDescription: 'أور من أقدم المدن في التاريخ البشري، تقع بالقرب من الناصرية في جنوب العراق. كانت مركزاً مهماً للحضارة السومرية وعاصمة لإمبراطورية أور الثالثة. تشتهر المدينة بزقورتها العظيمة التي بناها الملك أور-نامو، والمقبرة الملكية التي اكتشف فيها علماء الآثار كنوزاً ذهبية نادرة تعكس ثراء وتطور هذه الحضارة القديمة.',
      highlights: [
        'زقورة أور المدرجة',
        'المقبرة الملكية وكنوزها',
        'بيت النبي إبراهيم التقليدي',
        'متحف أور الأثري'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '3-5 ساعات',
        difficulty: 'سهل',
        facilities: 'متحف، مركز زوار، مقهى'
      },
      image: 'https://commons.wikimedia.org/wiki/File:Ziggurat_of_ur.jpg',
      rating: 4.9,
      reviews: 203
    },
    {
      id: 3,
      name: 'سامراء',
      englishName: 'Samarra',
      category: 'islamic',
      period: 'القرن التاسع الميلادي',
      location: 'محافظة صلاح الدين',
      coordinates: '34.1975°N, 43.8742°E',
      description: 'العاصمة العباسية التاريخية، تضم الجامع الكبير بمئذنته الحلزونية الشهيرة والمرقدين المقدسين.',
      fullDescription: 'سامراء مدينة تاريخية تقع على نهر دجلة شمال بغداد، كانت عاصمة الخلافة العباسية لفترة من الزمن في القرن التاسع الميلادي. تشتهر المدينة بجامعها الكبير الذي يعد من أكبر المساجد في العالم، ومئذنته الحلزونية الفريدة "الملوية". كما تضم مرقدي الإمامين علي الهادي والحسن العسكري، مما يجعلها مركزاً مهماً للحج الشيعي.',
      highlights: [
        'الجامع الكبير والمئذنة الحلزونية',
        'مرقد الإمام علي الهادي',
        'مرقد الإمام الحسن العسكري',
        'قصر الخليفة المعتصم'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '5-7 ساعات',
        difficulty: 'سهل',
        facilities: 'مراكز زوار، مطاعم، فنادق'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Samarra',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 4,
      name: 'بابل',
      englishName: 'Babylon',
      category: 'ancient',
      period: 'الألف الثاني ق.م - القرن السابع م',
      location: 'محافظة بابل',
      coordinates: '32.5355°N, 44.4275°E',
      description: 'المدينة الأسطورية التي حكمها نبوخذ نصر وحمورابي، موطن حدائق بابل المعلقة وبرج بابل.',
      fullDescription: 'بابل من أعظم مدن العالم القديم، تقع على نهر الفرات جنوب بغداد. كانت عاصمة الإمبراطورية البابلية وشهدت عهداً ذهبياً في عهد الملك نبوخذ نصر الثاني. اشتهرت بحدائقها المعلقة إحدى عجائب الدنيا السبع، وببرج بابل الأسطوري، وبشريعة حمورابي أقدم القوانين المكتوبة في التاريخ. اليوم يمكن للزوار استكشاف أطلال هذه المدينة العظيمة ومتحفها الذي يضم آثاراً نادرة.',
      highlights: [
        'بوابة عشتار المعاد بناؤها',
        'أطلال القصر الجنوبي',
        'موقع حدائق بابل المعلقة',
        'متحف بابل الأثري'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '4-6 ساعات',
        difficulty: 'متوسط',
        facilities: 'متحف، مرشدين، مقهى'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Babylon',
      rating: 4.6,
      reviews: 167
    },
    {
      id: 5,
      name: 'نوزي',
      englishName: 'Nuzi',
      category: 'archaeological',
      period: 'الألف الثاني ق.م',
      location: 'محافظة كركوك',
      coordinates: '35.4681°N, 44.3922°E',
      description: 'موقع أثري مهم يحتوي على آلاف الألواح المسمارية التي تكشف تفاصيل الحياة اليومية في العصر البابلي القديم.',
      fullDescription: 'نوزي موقع أثري يقع بالقرب من كركوك، كان مدينة مزدهرة في الألف الثاني قبل الميلاد. اكتشف علماء الآثار في هذا الموقع أكثر من 5000 لوح مسماري يوثق تفاصيل دقيقة عن الحياة الاقتصادية والاجتماعية والقانونية في تلك الفترة. هذه الألواح تعتبر كنزاً معرفياً يساعد في فهم تطور الحضارة في بلاد الرافدين.',
      highlights: [
        'أرشيف الألواح المسمارية',
        'أطلال المعابد والبيوت',
        'ورش الحرفيين القديمة',
        'نظام الري المتطور'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '2-3 ساعات',
        difficulty: 'سهل',
        facilities: 'مرشد محلي، لوحات تعريفية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Nuzi',
      rating: 4.3,
      reviews: 89
    },
    {
      id: 6,
      name: 'الأخيضر',
      englishName: 'Al-Ukhaidir',
      category: 'islamic',
      period: 'القرن الثامن الميلادي',
      location: 'محافظة كربلاء',
      coordinates: '32.2644°N, 43.5847°E',
      description: 'قصر صحراوي عباسي محفوظ بشكل رائع، يمثل تحفة معمارية إسلامية في قلب الصحراء.',
      fullDescription: 'قصر الأخيضر تحفة معمارية إسلامية تقع في صحراء كربلاء، بني في القرن الثامن الميلادي في العصر العباسي المبكر. يتميز القصر بحالة حفظ استثنائية وتصميم معماري فريد يجمع بين العناصر الساسانية والبيزنطية والإسلامية. يضم القصر قاعات استقبال فخمة، وحمامات، ومسجداً، وحدائق، مما يعكس نمط الحياة الأرستقراطية في العصر العباسي.',
      highlights: [
        'القاعة الكبرى بقبابها المزخرفة',
        'الحمامات العربية التقليدية',
        'المسجد الملحق بالقصر',
        'نظام التهوية المتطور'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-4 ساعات',
        difficulty: 'سهل',
        facilities: 'مرشد، مركز زوار صغير'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Al-Ukhaidir',
      rating: 4.5,
      reviews: 112
    },
    {
      id: 7,
      name: 'نينوى',
      englishName: 'Nineveh',
      category: 'ancient',
      period: 'الألف السابع ق.م - 612 ق.م',
      location: 'محافظة نينوى',
      coordinates: '36.3667°N, 43.1500°E',
      description: 'عاصمة الإمبراطورية الآشورية الحديثة، كانت أكبر مدينة في العالم في عصرها، وتشتهر بأسوارها الضخمة ومكتبة آشور بانيبال.',
      fullDescription: 'نينوى، الواقعة على الضفة الشرقية لنهر دجلة في الموصل، كانت واحدة من أعظم مدن العالم القديم وعاصمة الإمبراطورية الآشورية في أوج قوتها. اشتهرت المدينة بأسوارها المنيعة التي امتدت لمسافة 12 كيلومترًا، وبواباتها المهيبة مثل بوابة نرجال. كما ضمت قصوراً فخمة مثل قصر سنحاريب الذي لا يضاهى، ومكتبة آشور بانيبال الشهيرة التي حوت آلاف الألواح المسمارية في شتى فروع المعرفة.',
      highlights: [
        'بوابة نرجال المعاد بناؤها جزئياً',
        'أطلال قصر سنحاريب',
        'موقع مكتبة آشور بانيبال',
        'الأسوار الآشورية القديمة'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '3-5 ساعات',
        difficulty: 'متوسط',
        facilities: 'مرشدين محليين، لوحات إرشادية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Nineveh',
      rating: 4.7,
      reviews: 195
    },
    {
      id: 8,
      name: 'نمرود',
      englishName: 'Nimrud',
      category: 'ancient',
      period: 'القرن الثالث عشر ق.م - 612 ق.م',
      location: 'محافظة نينوى',
      coordinates: '36.0972°N, 43.3294°E',
      description: 'مدينة آشورية قديمة وعاصمة ثانية للإمبراطورية، تشتهر بكنوزها العاجية وقصر آشور ناصربال الثاني.',
      fullDescription: 'نمرود، التي عرفت قديماً باسم "كالح"، كانت مدينة آشورية رئيسية تقع جنوب نينوى. بلغت ذروة مجدها في عهد الملك آشور ناصربال الثاني الذي جعلها عاصمة إمبراطوريته وشيد فيها قصراً ضخماً مزيناً بالنقوش البارزة والمنحوتات الرائعة. اكتشف في الموقع كنوز نمرود الشهيرة، وهي مجموعة مذهلة من المجوهرات الذهبية والعاجيات التي تعكس فخامة البلاط الآشوري.',
      highlights: [
        'أطلال قصر آشور ناصربال الثاني',
        'الزقورة الآشورية',
        'موقع اكتشاف كنوز نمرود',
        'الثيران المجنحة (اللاماسو)'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '2-4 ساعات',
        difficulty: 'متوسط',
        facilities: 'مركز زوار، حراسة أمنية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Nimrud',
      rating: 4.6,
      reviews: 142
    },
    {
      id: 9,
      name: 'قطيسفون (المدائن)',
      englishName: 'Ctesiphon',
      category: 'archaeological',
      period: 'القرن الثاني ق.م - القرن السابع م',
      location: 'محافظة بغداد',
      coordinates: '33.0939°N, 44.5808°E',
      description: 'عاصمة الإمبراطوريتين الفرثية والساسانية، وتشتهر بطاق كسرى، أكبر قوس مبني من الطوب في العالم.',
      fullDescription: 'قطيسفون، أو المدائن كما تعرف في المصادر العربية، كانت مدينة عظيمة على نهر دجلة جنوب شرق بغداد. كانت عاصمة للإمبراطورية الفرثية ثم الساسانية لقرون عديدة. أبرز ما تبقى من هذه المدينة هو "طاق كسرى"، وهو إيوان ضخم كان جزءاً من قصر الحكم الساساني ويعتبر أكبر قوس مبني من الطوب غير المدعم في العالم، شاهداً على عظمة العمارة الساسانية.',
      highlights: [
        'طاق كسرى الشاهق',
        'أطلال القصر الأبيض',
        'بقايا المدينة القديمة',
        'متحف المدائن (إن وجد)'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع مفتوح، لوحات تعريفية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Ctesiphon',
      rating: 4.8,
      reviews: 215
    },
    {
      id: 15,
      name: 'كيش',
      englishName: 'Kish',
      category: 'ancient',
      period: 'الألف الرابع ق.م - القرن الثاني م',
      location: 'محافظة بابل',
      coordinates: '32.5500°N, 44.6000°E',
      description: 'مدينة سومرية قديمة جداً، تعتبر في قائمة الملوك السومريين أول مدينة حكمتها سلالة بعد الطوفان العظيم.',
      fullDescription: 'كيش، الواقعة بالقرب من بابل، كانت مدينة ذات نفوذ سياسي وديني كبير في فجر الحضارة السومرية. بحسب قائمة الملوك السومريين، كانت كيش أول مدينة تستعيد الملكية بعد الطوفان، مما يمنحها مكانة أسطورية. كشفت الحفريات عن قصور ومعابد ومقبرة ملكية مبكرة، مما يدل على أهميتها وثروتها في الألفية الثالثة قبل الميلاد.',
      highlights: [
        'أطلال الزقورة "خورساجكالاما"',
        'المقبرة الملكية القديمة',
        'بقايا القصور السومرية',
        'المدينة الأثرية الواسعة'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-3 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري مفتوح، يتطلب مرشد'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Kish',
      rating: 4.5,
      reviews: 95
    },
    {
      id: 16,
      name: 'لجش',
      englishName: 'Lagash',
      category: 'ancient',
      period: 'الألف الخامس ق.م - القرن الثاني ق.م',
      location: 'محافظة ذي قار',
      coordinates: '31.4167°N, 46.4000°E',
      description: 'دولة مدينة سومرية قوية، اشتهرت في عهد حاكمها غوديا، الذي ترك وراءه العديد من التماثيل والنصوص.',
      fullDescription: 'لجش كانت واحدة من أقدم وأكبر المدن في سومر. وصلت إلى ذروة قوتها في الألفية الثالثة قبل الميلاد. تشتهر المدينة بشكل خاص بفترة حكم غوديا، الذي كان راعياً عظيماً للفنون والعمارة. تم العثور على العديد من التماثيل الرائعة له، مصنوعة من الديوريت الصلب، بالإضافة إلى نصوص طويلة تسجل بناءه للمعابد. كانت لجش مركزاً تجارياً وثقافياً مهماً.',
      highlights: [
        'موقع معبد "إينينو"',
        'تماثيل غوديا (في المتاحف العالمية)',
        'أرشيف الألواح المسمارية',
        'بقايا نظام الري القديم'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-4 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري واسع، لا توجد خدمات'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Lagash',
      rating: 4.4,
      reviews: 80
    },
    {
      id: 17,
      name: 'إشنونا',
      englishName: 'Eshnunna',
      category: 'ancient',
      period: 'الألف الثالث ق.م - القرن الثامن عشر ق.م',
      location: 'محافظة ديالى',
      coordinates: '33.4833°N, 44.7333°E',
      description: 'مدينة قديمة مهمة في وادي ديالى، اشتهرت بقوانينها التي سبقت شريعة حمورابي.',
      fullDescription: 'إشنونا (تل أسمر حالياً) كانت عاصمة دولة قوية في منطقة وادي ديالى. ازدهرت المدينة كمركز تجاري يربط بلاد ما بين النهرين بعيلام والمناطق الشرقية. من أهم اكتشافاتها مجموعة من القوانين تعرف باسم "قوانين إشنونا"، وهي واحدة من أقدم مجموعات القوانين المعروفة، وتسبق شريعة حمورابي الشهيرة بحوالي قرنين من الزمان. كما عثر في معابدها على تماثيل مميزة للمصلين.',
      highlights: [
        'موقع قوانين إشنونا',
        'أطلال القصر الحاكم',
        'معبد الإله تيشباك',
        'تماثيل المصلين (في المتاحف)'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-3 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري، يتطلب تصريحاً للزيارة'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Eshnunna',
      rating: 4.3,
      reviews: 65
    },
    {
      id: 18,
      name: 'أريدو',
      englishName: 'Eridu',
      category: 'ancient',
      period: 'Ubaid',
      location: 'محافظة ذي قار',
      coordinates: '30.810°N, 46.103°E',
      description: 'واحدة من أقدم مدن بلاد ما بين النهرين. مركز عبادة الإله إنكي.',
      fullDescription: 'تعتبر أريدو واحدة من أقدم المدن في بلاد ما بين النهرين، ووفقاً للتقاليد السومرية، كانت أول مدينة في العالم. كانت المركز الرئيسي لعبادة الإله إنكي، إله الماء والحكمة. كشفت الحفريات عن سلسلة من المعابد التي بنيت فوق بعضها البعض على مدى قرون.',
      highlights: [
        'أطلال المعابد القديمة',
        'موقع الزقورة',
        'بقايا المدينة القديمة'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Eridu',
      rating: 4.2,
      reviews: 45
    },
    {
      id: 19,
      name: 'تل عبيد',
      englishName: 'Tell Ubaid',
      category: 'archaeological',
      period: 'Ubaid',
      location: 'محافظة ذي قار',
      coordinates: '30.969°N, 46.132°E',
      description: 'الموقع النموذجي لفترة العبيد. مجتمع زراعي مبكر.',
      fullDescription: 'تل عبيد هو الموقع الذي أعطى اسمه لفترة العبيد، وهي فترة حاسمة في تطور حضارة بلاد ما بين النهرين. كان الموقع عبارة عن مجتمع زراعي صغير، وقد تم العثور فيه على أدوات فخارية مميزة ومنازل من الطوب اللبن.',
      highlights: [
        'الفخار المميز لفترة العبيد',
        'بقايا المنازل القديمة',
        'الأدوات الحجرية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Tell_Ubaid',
      rating: 4.1,
      reviews: 30
    },
    {
      id: 20,
      name: 'تل أبو شهرين',
      englishName: 'Tell Abu Shahrain',
      category: 'archaeological',
      period: 'Early Bronze Age',
      location: 'محافظة ذي قار',
      coordinates: '30.800°N, 46.050°E',
      description: 'احتلال متعدد الفترات مع بقايا سكنية وإدارية.',
      fullDescription: 'تل أبو شهرين هو موقع أثري شهد احتلالاً متعدد الفترات، مع بقايا سكنية وإدارية. يقدم الموقع نظرة ثاقبة على تطور المستوطنات في جنوب بلاد ما بين النهرين.',
      highlights: [
        'الطبقات الأثرية المتعددة',
        'البقايا المعمارية',
        'القطع الفخارية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Tell_Abu_Shahrain',
      rating: 4.0,
      reviews: 25
    },
    {
      id: 21,
      name: 'تل اللحم',
      englishName: 'Tell al-Lahm',
      category: 'archaeological',
      period: 'Early Dynastic to Old Babylonian',
      location: 'محافظة ذي قار',
      coordinates: '30.983°N, 46.700°E',
      description: 'مستوطنة إقليمية مع أدلة على هياكل المعابد.',
      fullDescription: 'تل اللحم هو موقع مستوطنة إقليمية يعود تاريخها إلى فترة من سلالة أور الثالثة إلى العصر البابلي القديم. تم العثور على أدلة على وجود هياكل معابد، مما يشير إلى أهمية دينية محتملة للموقع.',
      highlights: [
        'بقايا هياكل المعابد',
        'الطبقات الأثرية',
        'القطع الفخارية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Tell_al-Lahm',
      rating: 4.0,
      reviews: 20
    },
    {
      id: 22,
      name: 'جرسو (تلو)',
      englishName: 'Girsu (Tello)',
      category: 'ancient',
      period: 'Early Dynastic',
      location: 'محافظة ذي قار',
      coordinates: '31.527°N, 46.176°E',
      description: 'المركز الديني والاقتصادي للغاش. تم العثور على أرشيفات.',
      fullDescription: 'كانت جرسو المركز الديني والاقتصادي لمدينة لجش السومرية. تم العثور في الموقع على أرشيفات مهمة من الألواح المسمارية، بالإضافة إلى منحوتات رائعة مثل مسلة النسور.',
      highlights: [
        'موقع مسلة النسور',
        'أرشيف الألواح المسمارية',
        'بقايا المعابد والقصور'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-3 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري واسع'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Girsu',
      rating: 4.3,
      reviews: 55
    },
    {
      id: 23,
      name: 'لارسا (سنكرة)',
      englishName: 'Larsa (Senkereh)',
      category: 'ancient',
      period: 'Old Babylonian',
      location: 'محافظة ذي قار',
      coordinates: '31.062°N, 45.967°E',
      description: 'مملكة بابلية قديمة مهمة. تم العثور على نقوش ملكية.',
      fullDescription: 'كانت لارسا مملكة أمورية قوية في العصر البابلي القديم، وتنافست مع بابل على الهيمنة. اشتهرت المدينة بمعبدها المخصص لإله الشمس أوتو/شمش. تم العثور على العديد من النقوش الملكية التي توثق تاريخ المدينة.',
      highlights: [
        'أطلال معبد إبابار',
        'النقوش الملكية',
        'بقايا المدينة القديمة'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-3 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري واسع'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Larsa',
      rating: 4.2,
      reviews: 50
    },
    {
      id: 24,
      name: 'تل صفر',
      englishName: 'Tell Sifr',
      category: 'archaeological',
      period: 'Early Dynastic',
      location: 'محافظة ذي قار',
      coordinates: '31.083°N, 46.250°E',
      description: 'تل إداري صغير به طبقات سكنية.',
      fullDescription: 'تل صفر هو تل إداري صغير يعود إلى عصر فجر السلالات. يحتوي الموقع على طبقات سكنية تقدم لمحة عن الحياة اليومية في تلك الفترة.',
      highlights: [
        'الطبقات السكنية',
        'الأدوات الفخارية',
        'البقايا المعمارية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Tell_Sifr',
      rating: 3.9,
      reviews: 15
    },
    {
      id: 25,
      name: 'تل الفرس',
      englishName: 'Tell al-Faras',
      category: 'archaeological',
      period: 'Early Bronze Age',
      location: 'محافظة ذي قار',
      coordinates: '30.950°N, 46.300°E',
      description: 'مستوطنة زراعية بها معالم للري.',
      fullDescription: 'تل الفرس هو موقع مستوطنة زراعية من العصر البرونزي المبكر. تظهر في الموقع معالم واضحة لأنظمة الري القديمة، مما يدل على تطور الزراعة في المنطقة.',
      highlights: [
        'أنظمة الري القديمة',
        'الأدوات الزراعية',
        'بقايا المستوطنة'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Tell_al-Faras',
      rating: 4.0,
      reviews: 20
    },
    {
      id: 26,
      name: 'مارد (تل السعدوم)',
      englishName: 'Marad (Tell as-Sadoum)',
      category: 'ancient',
      period: 'Old Babylonian',
      location: 'محافظة بابل',
      coordinates: '32.245°N, 44.650°E',
      description: 'مدينة صغيرة إلى متوسطة بها بقايا إدارية.',
      fullDescription: 'كانت مارد مدينة صغيرة إلى متوسطة الحجم في العصر البابلي القديم. تم العثور في الموقع على بقايا إدارية تشير إلى دورها كمركز محلي.',
      highlights: [
        'البقايا الإدارية',
        'الألواح المسمارية',
        'القطع الفخارية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع أثري مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Marad',
      rating: 4.0,
      reviews: 30
    },
    {
      id: 27,
      name: 'إيسن',
      englishName: 'Isin',
      category: 'ancient',
      period: 'Isin-Larsa',
      location: 'محافظة القادسية',
      coordinates: '32.333°N, 44.000°E',
      description: 'عاصمة سلالة إيسن. تشتهر بالنشاط القانوني والبنائي.',
      fullDescription: 'بعد سقوط سلالة أور الثالثة، برزت إيسن كقوة مهيمنة في بلاد ما بين النهرين وأسست سلالة حاكمة. اشتهرت المدينة بقوانينها ونشاطها البنائي الواسع.',
      highlights: [
        'موقع قوانين إيسن',
        'بقايا المباني العامة',
        'الألواح المسمارية'
      ],
      visitInfo: {
        bestTime: 'نوفمبر - مارس',
        duration: '2-3 ساعات',
        difficulty: 'متوسط',
        facilities: 'موقع أثري واسع'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Isin',
      rating: 4.2,
      reviews: 40
    },
    {
      id: 28,
      name: 'مخيم الإمام الحسين',
      englishName: 'Al-Mukhayam Shrine',
      category: 'religious',
      period: 'القرن السابع',
      location: 'محافظة كربلاء',
      coordinates: '32.6169°N, 44.0322°E',
      description: 'الموقع التقليدي لمخيم الإمام الحسين خلال معركة كربلاء.',
      fullDescription: 'مخيم الإمام الحسين هو المكان الذي أقام فيه الإمام الحسين وأنصاره خيامهم خلال معركة كربلاء. يعتبر الموقع مكاناً للذكرى والتأمل، حيث يستحضر الزوار الأحداث المأساوية التي وقعت في هذا المكان.',
      highlights: [
        'الخيام الرمزية',
        'مكان إقامة صلاة الجماعة',
        'الأجواء الروحانية'
      ],
      visitInfo: {
        bestTime: 'على مدار العام',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'مرافق دينية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Al-Mukhayam_Shrine',
      rating: 4.7,
      reviews: 300
    },
    {
      id: 29,
      name: 'طاق الزعفراني',
      englishName: 'Taq Al-Zafarani',
      category: 'archaeological',
      period: 'العصر العباسي',
      location: 'محافظة كربلاء',
      coordinates: '32.6167°N, 44.0333°E',
      description: 'معلم تاريخي حيث تلتقي التراث والروحانية.',
      fullDescription: 'طاق الزعفراني هو معلم تاريخي يعود إلى العصر العباسي. يمثل القوس بقايا بوابة قديمة، ويتميز بتصميمه المعماري الفريد. يعتبر الموقع مثالاً رائعاً على العمارة الإسلامية المبكرة في العراق.',
      highlights: [
        'القوس العباسي',
        'الزخارف المعمارية',
        'الأهمية التاريخية'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '1 ساعة',
        difficulty: 'سهل',
        facilities: 'موقع مفتوح'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Taq_Al-Zafarani',
      rating: 4.4,
      reviews: 150
    },
    {
      id: 30,
      name: 'مقبرة وادي السلام',
      englishName: 'Wadi Al-Salaam Cemetery',
      category: 'religious',
      period: 'أكثر من 1400 عام',
      location: 'محافظة النجف',
      coordinates: '32.0000°N, 44.3167°E',
      description: 'واحدة من أكبر المقابر في العالم، تضم رفات العديد من الأنبياء والعلماء.',
      fullDescription: 'تعتبر مقبرة وادي السلام في النجف أكبر مقبرة في العالم، وتضم ملايين القبور. يعتقد أنها تضم رفات العديد من الأنبياء والأولياء والعلماء، مما يجعلها مكاناً ذا أهمية روحانية كبيرة. تتميز المقبرة بتنوع شواهد القبور وتصميمها الفريد.',
      highlights: [
        'ضريح النبي هود وصالح',
        'مقامات الأئمة',
        'المساحة الشاسعة للمقبرة'
      ],
      visitInfo: {
        bestTime: 'على مدار العام',
        duration: '2-3 ساعات',
        difficulty: 'سهل',
        facilities: 'مرافق دينية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Wadi_Al-Salaam_Cemetery',
      rating: 4.8,
      reviews: 900
    },
    {
      id: 31,
      name: 'مسجد الكوفة المعظم',
      englishName: 'Great Mosque of Kufa',
      category: 'religious',
      period: 'القرن السابع',
      location: 'محافظة النجف',
      coordinates: '32.0289°N, 44.4014°E',
      description: 'أحد أقدم المساجد في الإسلام، وله أهمية كبيرة لدى المسلمين الشيعة.',
      fullDescription: 'يعتبر مسجد الكوفة المعظم من أقدم وأهم المساجد في العالم الإسلامي. كان المسجد مركزاً مهماً للعلم والدين، وفيه استشهد الإمام علي بن أبي طالب. يضم المسجد مقامات للعديد من الأنبياء والأولياء، ويتميز بتصميمه المعماري الفريد.',
      highlights: [
        'محراب الإمام علي',
        'مقامات الأنبياء والأولياء',
        'صحن المسجد الواسع'
      ],
      visitInfo: {
        bestTime: 'على مدار العام',
        duration: '2-3 ساعات',
        difficulty: 'سهل',
        facilities: 'مرافق دينية كاملة'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Great_Mosque_of_Kufa',
      rating: 4.9,
      reviews: 1100
    },
    {
      id: 32,
      name: 'مسجد السهلة',
      englishName: 'Al-Sahla Mosque',
      category: 'religious',
      period: 'القرن السابع',
      location: 'محافظة النجف',
      coordinates: '32.0333°N, 44.3833°E',
      description: 'مسجد تاريخي يعتقد أنه كان منزل العديد من الأنبياء، وله أهمية خاصة في عقيدة الشيعة.',
      fullDescription: 'مسجد السهلة هو مسجد تاريخي يقع في الكوفة، ويعتقد أنه كان منزلاً للعديد من الأنبياء مثل إبراهيم وإدريس. للمسجد أهمية خاصة في عقيدة الشيعة، حيث يعتقد أنه سيكون مكان إقامة الإمام المهدي عند ظهوره.',
      highlights: [
        'مقام الإمام المهدي',
        'مقامات الأنبياء',
        'الأجواء الروحانية'
      ],
      visitInfo: {
        bestTime: 'على مدار العام',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'مرافق دينية'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Al-Sahla_Mosque',
      rating: 4.8,
      reviews: 750
    },
    {
      id: 33,
      name: 'القصر العباسي',
      englishName: 'Abbasid Palace',
      category: 'islamic',
      period: 'القرن الثاني عشر',
      location: 'محافظة بغداد',
      coordinates: '33.3414°N, 44.3897°E',
      description: 'أحد القصور القليلة المتبقية من العصر العباسي في بغداد، ويتميز بعمارته الإسلامية الرائعة.',
      fullDescription: 'يعتبر القصر العباسي من أهم المعالم التاريخية في بغداد، وهو مثال نادر على العمارة العباسية. يتميز القصر بأقواسه المقرنصة وزخارفه الجصية المعقدة. يستخدم القصر حالياً كمتحف ومركز ثقافي.',
      highlights: [
        'الأقواس المقرنصة',
        'الزخارف الجصية',
        'الفناء المركزي'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'متحف، مركز ثقافي'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Abbasid_Palace',
      rating: 4.6,
      reviews: 400
    },
    {
      id: 34,
      name: 'المدرسة المستنصرية',
      englishName: 'Mustansiriya Madrasa',
      category: 'islamic',
      period: 'القرن الثالث عشر',
      location: 'محافظة بغداد',
      coordinates: '33.3408°N, 44.3886°E',
      description: 'واحدة من أقدم الجامعات في العالم، كانت مركزاً رئيسياً للعلم والمعرفة في العصر العباسي.',
      fullDescription: 'كانت المدرسة المستنصرية جامعة شاملة تدرس فيها مختلف العلوم، من الطب والرياضيات إلى الفقه والحديث. تتميز المدرسة بتصميمها المعماري الفريد وساعتها المائية الشهيرة. تعتبر المدرسة شاهداً على ازدهار العلم في بغداد خلال العصر الذهبي للإسلام.',
      highlights: [
        'الساعة المائية',
        'الفناء المركزي والنافورات',
        'قاعات المحاضرات'
      ],
      visitInfo: {
        bestTime: 'أكتوبر - أبريل',
        duration: '1-2 ساعات',
        difficulty: 'سهل',
        facilities: 'موقع تاريخي'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Mustansiriya_Madrasa',
      rating: 4.7,
      reviews: 550
    },
    {
      id: 35,
      name: 'مرقد الكاظمين',
      englishName: 'Al-Kadhimayn Shrine',
      category: 'religious',
      period: 'القرن الثامن',
      location: 'محافظة بغداد',
      coordinates: '33.3750°N, 44.3417°E',
      description: 'مرقد الإمامين موسى الكاظم ومحمد الجواد، وهو من أهم العتبات المقدسة لدى الشيعة.',
      fullDescription: 'يقع مرقد الكاظمين في بغداد، وهو مجمع ديني ضخم يضم ضريحي الإمامين موسى الكاظم ومحمد الجواد. يتميز المرقد بقبابه الذهبية ومآذنه الشاهقة، ويعتبر تحفة فنية من العمارة الإسلامية. يجذب المرقد ملايين الزوار سنوياً.',
      highlights: [
        'القباب الذهبية',
        'الزخارف الإسلامية',
        'الأجواء الروحانية'
      ],
      visitInfo: {
        bestTime: 'على مدار العام',
        duration: '2-3 ساعات',
        difficulty: 'سهل',
        facilities: 'مرافق دينية كاملة'
      },
      image: 'https://place-hold.it/400x300/F2E9E4/4A4E69&text=Al-Kadhimayn_Shrine',
      rating: 4.9,
      reviews: 1300
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        timestamp: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setMessages([message, ...messages]);
      setNewMessage('');
      setAuthorName('');
      toast.success('تم إرسال رسالتك بنجاح!');
    } else {
      toast.error('يرجى ملء جميع الحقول');
    }
  };

  const handleLikeMessage = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
    toast.success('تم إعجابك بالرسالة!');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background archaeological-pattern">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">كنوز العراق المخفية</h1>
                <p className="text-muted-foreground">اكتشف القصص المنسية</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
              <Button variant="outline" size="sm" onClick={() => scrollToDestinations()}>
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
            backgroundImage: `url('https://images.unsplash.com/photo-1559128010-44d6dec5d207?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-black/50 p-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              رحلة عبر التاريخ
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              استكشف المواقع الأثرية المذهلة في العراق، من المدن السومرية العريقة إلى القصور العباسية الفخمة. 
              كل موقع يحكي قصة حضارة عظيمة شكلت تاريخ البشرية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-archaeological" onClick={scrollToDestinations}>
                <Camera className="w-5 h-5 ml-2" />
                ابدأ الاستكشاف
              </Button>
              <Button variant="outline" size="lg" className="btn-ancient" onClick={scrollToMap}>
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
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category.id ? category.color + ' text-white' : ''
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
              <Card key={destination.id} className="group hover:shadow-archaeological transition-all duration-300 hover:-translate-y-2 ancient-texture">
                <CardHeader className="p-0">
                  <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{destination.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {destination.englishName} • {destination.location}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => toggleFavorite(destination.id)}>
                        <Heart className={`w-5 h-5 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({destination.reviews} تقييم)</span>
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
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{destination.name}</DialogTitle>
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
                            <h4 className="font-semibold mb-2">معلومات الزيارة</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">أفضل وقت للزيارة:</span>
                                <span>{destination.visitInfo.bestTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">مدة الزيارة:</span>
                                <span>{destination.visitInfo.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">مستوى الصعوبة:</span>
                                <span>{destination.visitInfo.difficulty}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">الإحداثيات:</span>
                                <span className="text-xs">{destination.coordinates}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">أبرز المعالم</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {destination.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">الخدمات المتوفرة</h4>
                          <p className="text-sm text-muted-foreground">{destination.visitInfo.facilities}</p>
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
                            <p className="text-xs text-muted-foreground">{message.timestamp}</p>
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
                        <p className="text-sm leading-relaxed">{message.message}</p>
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
                    <Button onClick={handleSendMessage} className="btn-archaeological">
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
                منصة مخصصة لاستكشاف التراث الأثري العراقي العريق وتعريف العالم بكنوز الحضارة العراقية.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط مفيدة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">دليل المسافر</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">نصائح السفر</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">الأحداث والفعاليات</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تابعنا</h4>
              <p className="text-sm text-muted-foreground mb-4">
                ابق على اطلاع بآخر الاكتشافات والأخبار الأثرية
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">فيسبوك</Button>
                <Button size="sm" variant="outline">تويتر</Button>
                <Button size="sm" variant="outline">إنستغرام</Button>
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