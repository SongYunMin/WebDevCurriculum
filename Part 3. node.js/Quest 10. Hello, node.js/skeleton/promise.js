async function func1() {
    return 1;
}

async function func2() {
    return Promise.resolve(2);
}

func1().then(console.log); // 1
func2().then(console.log); // 2