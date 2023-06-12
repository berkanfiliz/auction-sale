import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";

export const BottomSection = () => {
  const [showCounts, setShowCounts] = useState(false);
  const [userData, setUserData] = useState({
    userCount: 0,
    activeAuctionCount: 0,
    inactiveAuctionCount: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/users");
        const ihale = await axios.get("/api/ihale");
        const allIhale = ihale.data.ihale;
        let activeIhale = 0;
        let inactiveIhale = 0;

        allIhale.map((ihale) => {
          if (ihale.durum) {
            activeIhale++;
          } else {
            inactiveIhale++;
          }
        });
        setUserData({
          userCount: data.message.length,
          activeAuctionCount: activeIhale,
          inactiveAuctionCount: inactiveIhale,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();

    // Sayfanın alt kısmına yaklaşıldığında sayıları göster
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 450) {
        setShowCounts(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center gap-8 h-26 md:h-40">
          <div className={`bg-white w-full rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center transform-gpu hover:scale-105 transition duration-300 ease-in-out ${showCounts ? "count-up" : ""}`}>
            <h2 className="text-lg font-bold mb-2">Siteye Üye Olan Kullanıcı Sayısı</h2>
            <p className="text-2xl font-bold">{showCounts && <CountUp end={userData.userCount} duration={6} />}</p>
          </div>
          <div className={`bg-white w-full rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center transform-gpu hover:scale-105 transition duration-300 ease-in-out ${showCounts ? "count-up" : ""}`}>
            <h2 className="text-lg font-bold mb-2">Aktif İhale Sayısı</h2>
            <p className="text-2xl font-bold">{showCounts && <CountUp end={userData.activeAuctionCount} duration={6} />}</p>
          </div>
          <div className={`bg-white w-full rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center transform-gpu hover:scale-105 transition duration-300 ease-in-out ${showCounts ? "count-up" : ""}`}>
            <h2 className="text-lg font-bold mb-2">Pasif İhale Sayısı</h2>
            <p className="text-2xl font-bold"> {showCounts && <CountUp end={userData.inactiveAuctionCount} duration={6} />}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
