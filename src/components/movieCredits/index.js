// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getCredits } from "../../api/tmdb-api";
// import { excerpt } from "../../util";


// export default ({movie}) => {
//     const [credits, setCredits] = useState([]);

//     useEffect(() = > {
//         getCredits(movie.id).then(credits => {
//             setCredits(credits.credits);
//         });
//     }, []);

//     return (
//         <div>
//             <h4>Cast</h4>
//             {credits.map(c => {
//                 return (
//                     <div>
//                         {c.name}
//                     </div>
//                 );
                
//             })}
//         </div>
//     );
// };