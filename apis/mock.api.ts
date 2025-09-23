
export const fetchPosts = async (limit : number, page : number, search? : string) =>{
 return new Promise((resolve) =>{
  setTimeout(() =>{
    const postData = Array.from({length : 100}, (value, i) =>{
        return {
            _id : `${i + 1}`,
            name : `Post ${i + 1}`
        }
    });



    let data = [...postData];


    if(search){
        data = data?.filter((ele) =>{
            return ele?.name?.toLocaleUpperCase().includes(search.toLocaleLowerCase());
        })
    }
        let total = data?.length;

    if(limit && page){
        const s = (page - 1) * limit;
        data = data.slice(s, s + limit);
    }


    resolve({
        posts : data,
        total : total,
        currentPage : page || 1,
        limit : limit || total,
        totalPage : limit ? Math.ceil(total/limit) : 1
    })

  }, 1000)
 });
}