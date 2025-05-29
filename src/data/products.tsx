// data/dishes.js

const dishes = [
  // Đồ nướng
  {
    id: "grilled-pork-skewers",
    name: "Thịt xiên nướng",
    category: "grilled",
    subcategory: "grilled-meat",
    price: 35000,
    description: "Thịt heo ướp đậm vị nướng thơm lừng, ăn kèm dưa góp.",
    image:
      "https://file.hstatic.net/200000721249/file/lam-thit-xien-nuong_949687797de0453dbb66b87b71b9f2ad.jpg",
  },
  {
    id: "grilled-octopus",
    name: "Bạch tuộc nướng sa tế",
    category: "grilled",
    subcategory: "grilled-seafood",
    price: 69000,
    description: "Bạch tuộc tươi nướng với sa tế cay nồng, giòn ngon hấp dẫn.",
    image:
      "https://cdn.tgdd.vn/2021/04/CookRecipe/GalleryStep/thanh-pham-460.jpg",
  },
  {
    id: "grilled-shrimp",
    name: "Tôm nướng muối ớt",
    category: "grilled",
    price: 79000,
    description: "Tôm sú nướng muối ớt cay mặn đậm đà, thơm phức.",
    image:
      "https://i-giadinh.vnecdn.net/2023/11/05/Thnhphm11-1699170028-3875-1699170031.jpg",
  },
  {
    id: "grilled-beef",
    name: "Bò nướng lá lốt",
    category: "grilled",
    price: 85000,
    description: "Thịt bò cuốn lá lốt, nướng thơm nức, vị bùi béo đặc trưng.",
    image:
      "https://img-global.cpcdn.com/recipes/1d72ce456e55c4d6/1200x630cq70/photo.jpg",
  },

  // Lẩu
  {
    id: "thai-hotpot",
    name: "Lẩu Thái chua cay",
    category: "hotpot",
    subcategory: "thai-hotpot",
    price: 250000,
    description: "Nước lẩu đậm vị Thái với tôm, mực, nấm và rau ăn kèm.",
    image:
      "https://i-giadinh.vnecdn.net/2023/12/29/Buoc-4-4-3149-1703835584.jpg",
  },
  {
    id: "beef-hotpot",
    name: "Lẩu bò nhúng giấm",
    category: "hotpot",
    subcategory: "beef-hotpot",
    price: 280000,
    description: "Thịt bò mềm nhúng cùng giấm chua thanh, ăn kèm rau sống.",
    image:
      "https://vietferm.vn/wp-content/uploads/sites/116/2023/02/image-95-1030x580.png",
  },
  {
    id: "seafood-hotpot",
    name: "Lẩu hải sản",
    category: "hotpot",
    price: 270000,
    description:
      "Nước lẩu đậm vị hải sản, tôm mực cá viên đầy đủ, ăn kèm rau nấm tươi.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ_WW3r1rDtQ0CQsnR015Ti7vD2NDEqhRxug&s",
  },
  {
    id: "mushroom-hotpot",
    name: "Lẩu nấm",
    category: "hotpot",
    price: 230000,
    description:
      "Lẩu thanh đạm với nước dùng từ rau củ và các loại nấm tươi ngon.",
    image: "https://cdn.tgdd.vn/2021/06/CookProduct/lau1200-1200x676.jpg",
  },
  {
    id: "kimchi-hotpot",
    name: "Lẩu kim chi Hàn Quốc",
    category: "hotpot",
    price: 260000,
    description:
      "Nước lẩu cay nồng vị kim chi truyền thống, thêm thịt bò và đậu hũ non.",
    image:
      "https://cdn.tgdd.vn/2021/10/CookDish/cach-nau-lau-kim-chi-hai-san-han-quoc-chua-cay-dam-da-huong-avt-1200x676.jpeg",
  },
  {
    id: "chicken-hotpot",
    name: "Lẩu gà lá é",
    category: "hotpot",
    price: 290000,
    description:
      "Đặc sản Đà Lạt với thịt gà mềm và lá é thơm dịu, nước dùng cay nhẹ.",
    image:
      "https://kalite.vn/wp-content/uploads/2024/12/402598452_7004207222975681_6403554273470642148_n-2.jpg",
  },
  {
    id: "goat-hotpot",
    name: "Lẩu dê thuốc bắc",
    category: "hotpot",
    price: 320000,
    description:
      "Thịt dê hầm thuốc bắc, thơm lừng và bổ dưỡng, ăn kèm mì hoặc bún.",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_21_638414620525427272_cach-nau-mon-thit-de-ham-thuoc-bac-bo-duong-ngon-nhu-ngoai-hang.jpg",
  },

  // Đồ nhắm
  {
    id: "peanuts",
    name: "Đậu phộng rang muối",
    category: "snacks",
    price: 15000,
    description: "Đậu phộng rang vàng, giòn thơm, phủ muối mặn vừa ăn.",
    image:
      "https://cdn.tgdd.vn/Files/2021/07/27/1371416/cach-lam-dau-phong-rang-muoi-thom-ngon-gion-rum-de-lam-tai-nha-202107271423292469.jpg",
  },
  {
    id: "dried-beef",
    name: "Bò khô sợi",
    category: "snacks",
    price: 49000,
    description: "Bò khô xé sợi cay nhẹ, dai ngon đậm vị truyền thống.",
    image: "https://nvhphunu.vn/wp-content/uploads/2024/04/n1.jpg",
  },
  {
    id: "pickled-tofu",
    name: "Chao chấm rau",
    category: "snacks",
    price: 20000,
    description: "Chao lên men thơm béo, chấm rau luộc hoặc lẩu cực hợp.",
    image:
      "https://cdn.tgdd.vn/2020/10/CookRecipe/GalleryStep/thanh-pham-746.jpg",
  },
  {
    id: "fermented-pork",
    name: "Nem chua rán",
    category: "snacks",
    price: 40000,
    description: "Nem chua rán giòn rụm bên ngoài, bên trong chua nhẹ hấp dẫn.",
    image: "https://cf.shopee.vn/file/vn-11134202-7r98o-lpqc9x507pec90",
  },

  // Hải sản
  {
    id: "steamed-clams",
    name: "Nghêu hấp sả",
    category: "seafood",
    price: 59000,
    description: "Nghêu tươi hấp cùng sả và ớt, thơm dịu, nước ngọt thanh.",
    image: "https://cdn.tgdd.vn/2021/06/CookProduct/1-1200x676-72.jpg",
  },
  {
    id: "fried-squid",
    name: "Mực chiên nước mắm",
    category: "seafood",
    price: 69000,
    description: "Mực chiên giòn rưới nước mắm tỏi ớt mặn ngọt cực cuốn.",
    image: "https://i.ytimg.com/vi/eNywvmk3pow/maxresdefault.jpg",
  },
  {
    id: "grilled-scallops",
    name: "Sò điệp nướng mỡ hành",
    category: "seafood",
    price: 65000,
    description: "Sò điệp nướng trên than hồng, thêm mỡ hành thơm béo ngậy.",
    image:
      "https://haisanmino.com/wp-content/uploads/2024/09/so-diep-nuong-mo-hanh5-1024x768.jpg",
  },
  {
    id: "stir-fried-crab",
    name: "Cua rang me",
    category: "seafood",
    price: 99000,
    description: "Cua rang cùng sốt me chua ngọt, ăn kèm bánh mì hoặc cơm.",
    image:
      "https://cdn.tgdd.vn/2022/02/CookDish/3-cach-lam-mon-cua-rang-me-ngot-tuyet-vi-chua-ngot-avt-1200x676.jpg",
  },
  // Đồ uống
  {
    id: "beer-heineken",
    name: "Bia Heineken",
    category: "drinks",
    price: 25000,
    description: "Bia lager nổi tiếng từ Hà Lan, vị đậm đà dễ uống.",
    image:
      "https://catalog-assets-asia-southeast1.aeon-vn-prod.e.spresso.com/c3RvcmFnZS5nb29nbGVhcGlzLmNvbQ==/YWVvbnZpZXRuYW0tc3ByZXNzby1wdWJsaWM=/Rk9PRExJTkUgMjAyNA==/T0NU/MDU0NzgzNDcgKDEp.jpg",
  },
  {
    id: "beer-saigon",
    name: "Bia Sài Gòn",
    category: "drinks",
    price: 18000,
    description: "Hương vị truyền thống Việt Nam, dễ uống, phù hợp mọi bữa ăn.",
    image:
      "https://cdn.tgdd.vn/Products/Images/2282/158349/bhx/thung-24-lon-bia-sai-gon-lager-330ml-202110111038144356.jpg",
  },
  {
    id: "soju",
    name: "Rượu Soju Hàn Quốc",
    category: "drinks",
    price: 45000,
    description: "Rượu gạo truyền thống Hàn Quốc, nhẹ và thơm.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2UkKW1HO4x8ksZHpSuiLkB7tZBzN8QcR32A&s",
  },
  {
    id: "soda-chanh",
    name: "Soda chanh",
    category: "drinks",
    price: 20000,
    description: "Nước soda chanh mát lạnh, giải khát cực đã.",
    image: "https://tdgimex.com/wp-content/uploads/2025/04/soda-chanh.webp",
  },
  {
    id: "nuoc-ngot-pepsi",
    name: "Pepsi",
    category: "drinks",
    price: 15000,
    description: "Nước ngọt có ga vị cola truyền thống, mát lạnh sảng khoái.",
    image:
      "https://minhcaumart.vn/media/com_eshop/products/8934588012228%201.jpg",
  },
];

export default dishes;
