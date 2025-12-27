export const mockUsers = {
  freelancer: {
    _id: "693b300aca697cf585552579",
    email: "sadik@example.com",
    username: "sadik",
    full_name: "Sadik Ho",
    role: "freelancer",
    rating: 4.8,
    total_reviews: 12,
    completed_orders: 8,
    skills: ["Web Development", "React", "Node.js", "MongoDB"],
    languages: ["Français", "Anglais", "Arabe"],
    hourly_rate: 25,
    response_time: 2,
    is_verified: true,
    is_active: true,
    bio: "Développeur web full-stack avec 5 ans d'expérience. Spécialisé en React et Node.js.",
    city: "Essaouira",
    country: "Maroc",
    phone_number: "063917XXXX",
    avatar_url: "/uploads/avatar.jpg",
    portfolio_items: [
      {
        title: "Site E-commerce",
        description: "Plateforme e-commerce complète",
        category: "web",
        skills: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/project1"
      }
    ],
    created_at: "2025-12-11T20:56:42.604Z"
  },
  client: {
    _id: "693b3c0a1b63d943cea4a051",
    email: "client@example.com",
    username: "john_doe",
    full_name: "John Doe",
    role: "client",
    is_verified: true,
    city: "Casablanca",
    country: "Maroc",
    avatar_url: "/uploads/avatar-client.jpg",
    created_at: "2025-12-11T21:30:00.000Z"
  }
};

export const mockGigs = [
  {
    _id: "693da3bd79621fddf4d00514",
    freelancer_id: "693b300aca697cf585552579",
    freelancer_name: "Sadik Ho",
    freelancer_avatar: "/uploads/avatar.jpg",
    title: "Développement Web React/Node.js",
    description: "Création de site web moderne avec React frontend et Node.js backend. Design responsive et base de données MongoDB.",
    base_price: 399,
    delivery_days: 5,
    slug: "web-development-react-node",
    status: "active",
    category_id: "693d85dd79621fddf4d00505",
    category_name: "Web Development",
    currency: "USD",
    pricing_type: "fixed",
    revisions_included: 2,
    images_url: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w-800&auto=format&fit=crop"
    ],
    is_featured: true,
    is_urgent: false,
    total_orders: 15,
    total_earning: 5985,
    gig_rating: 4.9,
    gig_reviews: 8,
    published_at: "2025-12-13T17:35:01.207Z",
    search_tags: ["web", "react", "nodejs", "javascript", "mongodb"]
  },
  {
    _id: "6920cdeef90eacd39969d188",
    freelancer_id: "6920c510747da49650b2d6d4",
    freelancer_name: "Ahmed Khalil",
    freelancer_avatar: "/uploads/avatar2.jpg",
    title: "Logo Design Professionnel",
    description: "Création de logo unique pour votre entreprise. 3 concepts différents.",
    base_price: 150,
    delivery_days: 3,
    slug: "logo-design-professional",
    status: "active",
    category_name: "Design Graphique",
    currency: "USD",
    gig_rating: 4.7,
    total_orders: 42,
    images_url: ["https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format"]
  },
  {
    _id: "6920ce7df90eacd39969d18a",
    freelancer_id: "692a3bd6f3be085d2499e02d",
    freelancer_name: "Maria Garcia",
    freelancer_avatar: "/uploads/avatar3.jpg",
    title: "Traduction Français-Anglais",
    description: "Traduction professionnelle de documents. Spécialisé en textes techniques et marketing.",
    base_price: 80,
    delivery_days: 2,
    slug: "french-english-translation",
    status: "active",
    category_name: "Rédaction & Traduction",
    currency: "USD",
    gig_rating: 4.8,
    total_orders: 27,
    images_url: ["https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=800&auto=format"]
  }
];

export const mockCategories = [
  { _id: "693d85dd79621fddf4d00505", name: "Web Development", slug: "web-development", icon: "💻" },
  { _id: "693d8f0279621fddf4d0050e", name: "AI & Machine Learning", slug: "ai-machine-learning", icon: "🤖" },
  { _id: "1", name: "Design Graphique", slug: "graphic-design", icon: "🎨" },
  { _id: "2", name: "Marketing Digital", slug: "digital-marketing", icon: "📈" },
  { _id: "3", name: "Rédaction & Traduction", slug: "writing-translation", icon: "✍️" },
  { _id: "4", name: "Vidéo & Animation", slug: "video-animation", icon: "🎬" },
  { _id: "5", name: "Musique & Audio", slug: "music-audio", icon: "🎵" },
  { _id: "6", name: "Business", slug: "business", icon: "💼" }
];

export const mockOrders = [
  {
    _id: "6930d6219ca9d71a5da3111b",
    order_number: "ORD-2025-0001",
    client_id: "693b3c0a1b63d943cea4a051",
    client_name: "John Doe",
    freelancer_id: "693b300aca697cf585552579",
    freelancer_name: "Sadik Ho",
    gig_id: "693da3bd79621fddf4d00514",
    gig_title: "Développement Web React/Node.js",
    amount: 399,
    currency: "USD",
    service_fee: 60,
    total_amount: 459,
    deadline: "2025-12-20T00:30:25.745Z",
    status: "in_progress", // pending, in_progress, delivered, completed, cancelled
    revision_count: 0,
    max_revisions: 2,
    created_at: "2025-12-04T00:30:25.745Z",
    progress_percentage: 60,
    delivery_files: []
  },
  {
    _id: "6948218e72712b96bb0ee9ba",
    order_number: "ORD-2025-0002",
    client_id: "693b3c0a1b63d943cea4a051",
    client_name: "John Doe",
    freelancer_id: "693b300aca697cf585552579",
    freelancer_name: "Sadik Ho",
    gig_id: "6920cdeef90eacd39969d188",
    gig_title: "Logo Design Professionnel",
    amount: 150,
    currency: "USD",
    status: "completed",
    created_at: "2025-12-15T10:20:00.000Z",
    completed_at: "2025-12-18T14:30:00.000Z"
  }
];

export const mockMessages = [
  {
    _id: "694adfc5ac8e3c9ab4f90f97",
    order_id: "6948218e72712b96bb0ee9ba",
    sender_id: "693b3c0a1b63d943cea4a051",
    sender_name: "John Doe",
    receiver_id: "693b300aca697cf585552579",
    receiver_name: "Sadik Ho",
    message_type: "text",
    content: "Bonjour, quand pourrez-vous commencer le projet?",
    is_read: true,
    created_at: "2025-12-23T18:20:00.000Z"
  },
  {
    _id: "694adfc5ac8e3c9ab4f90f98",
    order_id: "6948218e72712b96bb0ee9ba",
    sender_id: "693b300aca697cf585552579",
    sender_name: "Sadik Ho",
    receiver_id: "693b3c0a1b63d943cea4a051",
    receiver_name: "John Doe",
    message_type: "text",
    content: "Je peux commencer demain matin. Avez-vous les spécifications détaillées?",
    is_read: true,
    created_at: "2025-12-23T18:25:00.000Z"
  }
];

export const mockNotifications = [
  {
    _id: "1",
    user_id: "693b300aca697cf585552579",
    type: "order_received",
    title: "Nouvelle commande reçue",
    message: "John Doe a commandé votre service 'Développement Web React/Node.js'",
    is_read: false,
    created_at: "2025-12-23T19:30:00.000Z",
    action_url: "/freelancer/orders/6930d6219ca9d71a5da3111b"
  },
  {
    _id: "2",
    user_id: "693b300aca697cf585552579",
    type: "message_received",
    title: "Nouveau message",
    message: "John Doe vous a envoyé un message concernant la commande ORD-2025-0001",
    is_read: true,
    created_at: "2025-12-23T18:20:00.000Z",
    action_url: "/freelancer/messages"
  }
];