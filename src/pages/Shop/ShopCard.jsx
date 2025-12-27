import { Link } from "react-router"

// , handleQuickAddToCart

const ShopCard = ({ item }) => {
    return (
        <Link to={`/product/${item._id}`} className="card shadow-xs shadow-primary hover:shadow-lg transition-shadow duration-200">

            <div>
                <figure>
                    <img
                        src={item.imgUrl}
                        alt={item.itemName}
                        className="h-42 object-cover transition-transform duration-300 hover:scale-105 rounded-t-sm"></img>
                </figure>
                <div className="p-2 ">
                    <div className="p-2 flex justify-between items-center">
                        <h2 className="text-lg font-bold">
                            {item.itemName.length > 12
                                ? item.itemName.slice(0, 12) + "..."
                                : item.itemName}
                        </h2>
                        <p className="italic">{parseFloat(item.perUnitPrice).toFixed(0)}<span>TK</span></p>
                    </div>
                    <div className="p-2 flex justify-between items-center">
                        <p className="text-primary">Discount:</p>
                        <p className="text-primary">{item.discount}%</p>
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}
export default ShopCard

// <figure>
//     <img
//         src={item.imgUrl}
//         alt={item.itemName}
//         className="h-42 opacity-90 hover:opacity-100 object-cover"></img>
// </figure>
// <div className="card-body hover:bg-blue-500/5">
//     {/* <h2 className="card-title">{item.itemName}</h2> */}
// <h2 className="card-title min-h-[53px]">
//     {item.itemName.length > 15
//         ? item.itemName.slice(0, 15) + "..."
//         : item.itemName}
// </h2>
//     {
//         !fromHome &&
//         <>
//             <p>{item.company}</p>
//             <div className="flex justify-between">
//                 <p>Price: {parseFloat(item.perUnitPrice).toFixed(2)}</p>
//                 <p className="text-yellow-400">Diacount: {item.discount}%</p>
//             </div></>
//     }
//     {/* onClick={() => handleQuickAddToCart(item)} */}
//     <div className="card-actions justify-end">
//         <button className="btn btn-sm w-full btn-primary">Buy Now</button>
//     </div>


// </div>