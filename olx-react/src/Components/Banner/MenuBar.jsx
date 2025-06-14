import Arrow from "../../assets/Arrow"
import './Banner.css';

export default function MenuBar(){

    const categories = [
        "Cars", "Motorcycles", "Mobile Phones",
        "Houses & Apartments for Sale",
        "Scooters", "Commercial Vehicles",
        "Houses & Apartments for Rent"
      ];

    return (
        <div className="menuBar">
        
                  <div className="categoryMenu">
                    <span>ALL CATEGORIES</span>
                    <Arrow />
                  </div>
        
                  <div className="otherQuickOptions">
                    {categories.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
        
        </div>
    )
}