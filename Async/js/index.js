function /* async エラーになる */ ThreeFreeze(resolve, reject) {
    // 3秒後の実行をお願いして、
    setTimeout(
        /* await エラーになる */() => {
            console.log('３Freeze!');
            // resolve が渡されていれば、そいつを実行して返す
            if (resolve !== undefined) return resolve('Resolve Done!');        
        }, 
        3000
    );
}

function ThreeFreezeAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => { 
                console.log('3Freeze!'); 
                return resolve('Resolve Done!');        
            },
            3000
        );
    });
}

const act = 1; 

switch (act) {
    case 1:
        // 非同期で 3 feeeze を実行
        {
            console.log('Start');
            ThreeFreeze();
            console.log('Shown before 3Freeze!');
        }
        break;
    case 2:
        // Promise により同期実行
        {
            console.log('Start');
            const promise = new Promise(ThreeFreeze);
            promise.then((result) => {
                // resolve を待つのは、 then の中だけ！
                // プログラム全体は、"Program Terminated まで走り続ける。
                console.log(result);
                console.log('Shown after 3Freeze!');
            })
            .catch((error) => {
                console.log(error);
            });
        }
        break;
    case 3:
        // Promise により同期実行
        // ただし、ThreeFreeze()関数はPromise()を返すように修正
        {
            console.log('Start');
            ThreeFreezeAsync().then(() => {
                console.log('Shown after 3Freeze!');
            });
        }
        break;
    case 4:
        // Promise により同期実行
        // ただし、待ちは primise.then() ではなく、await を使用
        {
            (async () => {
                console.log('Start');
                await ThreeFreezeAsync();
                console.log('Shown after 3Freeze!');
            })();
        }
        break;
}
console.log("Program Terminated...")
