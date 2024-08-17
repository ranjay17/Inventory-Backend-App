
function deleteProduct(id){
    const result = confirm('Confirm deletion?');
    if(result){
        fetch('/delete-product/' + id,{
            method: "post"
        }).then(res=>{
            if(res.ok){
                location.reload();
            }
        })
    }
}