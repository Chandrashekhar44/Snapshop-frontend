"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "../../../lib/axios";
import { Loader2 } from "lucide-react";


type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  images: string[];

  Seller: {
    id: number;
    shopName: string;
  };
};




export default function ProductView() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);
const [orderPlaced, setOrderPlaced] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/product/${id}`,
          {
            withCredentials: true,
          }
        );

        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071027] text-white">
        Loading product...
      </div>
    );
  }

  const nextImage = () => {
    setActiveImage(
      (activeImage + 1) % product.images.length
    );
  };

  const previousImage = () => {
    setActiveImage(
      (activeImage - 1 + product.images.length) %
        product.images.length
    );
  };

  const orderHandler = async () => {
    try {
       setPlacingOrder(true);
      const res = await axios.post(
        "http://localhost:5002/api/products/place-order",
        {
  productId: product.id,
  quantity: 1,
},
        {
          withCredentials: true,
        }
      );

       setOrderPlaced(true);


      console.log("Order created:", res.data);


    } catch (error) {
      console.error("ORDER ERROR:", error);
    }finally {
    setPlacingOrder(false);
  }
  };

  return (
    <div className="min-h-screen bg-[#071027] text-white p-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">


        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#101c3f] border border-white/10">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur text-2xl hover:bg-black/70"
            >
              ←
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur text-2xl hover:bg-black/70"
            >
              →
            </button>
          </div>


          <div className="flex gap-3 mt-5 overflow-x-auto">
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                className={`w-20 h-20 rounded-xl overflow-hidden border ${
                  activeImage === index
                    ? "border-[#FF3D6B]"
                    : "border-white/10"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>


        <div className="space-y-6">


          <div>
            <p className="text-sm text-white/50">
              {product.category}
            </p>

            <h1 className="text-4xl font-black mt-2">
              {product.name}
            </h1>
          </div>


          <div className="text-3xl font-bold text-[#FF3D6B]">
            ₹ {product.price}
          </div>


          <div className="flex gap-3">
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
              {product.condition}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
              Available
            </span>
          </div>


          <div className="bg-[#101c3f] border border-white/10 rounded-2xl p-5">
            <h2 className="font-bold text-xl mb-3">
              Description
            </h2>

            <p className="text-white/60 leading-relaxed">
              {product.description}
            </p>
          </div>


          <div className="bg-[#101c3f] border border-white/10 rounded-2xl p-5">
            <p className="text-white/50 text-sm">
              Seller
            </p>

            <button
              onClick={() =>
                router.push(`/shop/${product.Seller.id}`)
              }
              className="text-xl font-bold mt-2 underline hover:text-[#FF3D6B] transition"
            >
              {product.Seller.shopName}
            </button>

            <p className="text-sm text-white/40 mt-2">
              View seller shop →
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-4">
             <button
    onClick={orderHandler}
    disabled={placingOrder || orderPlaced}
    className="flex-1 py-4 rounded-2xl bg-[#FF3D6B] font-bold text-lg hover:scale-[1.02] transition disabled:opacity-70 flex items-center justify-center gap-2"
  >
    {placingOrder ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        Placing Order...
      </>
    ) : orderPlaced ? (
      "✅ Order Placed"
    ) : (
      "Buy Now"
    )}
  </button>

            <button
              className="flex-1 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition"
            >
              Chat Seller
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}