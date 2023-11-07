export const useFilterData = (array) => {
    return array.map((item) => {
        return {
            name: item.name,
            age: item.age,
        }
    })

    // return array.map((x, i) => {
    //     return (
    //         <h2 key={i}>
    //             {x.name}- {x.age}
    //         </h2>
    //     )
    // })
}
