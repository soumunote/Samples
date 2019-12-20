const p1 = new Promise((resolve, reject) => {
    setTimeout(
        () => { 
            console.log('p1'); 
            return resolve('p1 Resolve!');        
        },
        3000
    );
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(
        () => { 
            console.log('p2'); 
            return resolve('p2 Resolve!');        
        },
        4000
    );
});

p1.then((value) => {

})

const allDone = [];

Promise.all([
    p1.then((value) => {
        allDone.push(
            new Promise((resolve, reject) => {
                setTimeout(
                    () => { 
                        console.log('p1 then'); 
                        return resolve('p1 then Resolve!');        
                    },
                    5000
                );
            })
        );
    }),
    p2.then((value) => {
        allDone.push(
            new Promise((resolve, reject) => {
                setTimeout(
                    () => { 
                        console.log('p2 then'); 
                        return resolve('p2 then Resolve!');        
                    },
                    5000
                )
            })
        );
    })]).then((value) => {
    
        Promise.all(allDone).then(() => {
            console.log('All done!');
        });
    
});
