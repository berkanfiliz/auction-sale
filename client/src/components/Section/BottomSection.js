import { useEffect, useState } from "react";
import CountUp from "react-countup";

export const BottomSection = () => {
  const [showCounts, setShowCounts] = useState(false);
  const [userData, setUserData] = useState({
    userCount: 250,
    activeAuctionCount: 50,
    inactiveAuctionCount: 200,
  });

  useEffect(() => {
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
        <div className="flex justify-center gap-8 h-40">
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
