export function initTabs() {
    const button1 = document.getElementById("but1");
    const button2 = document.getElementById("but2");
    const button3 = document.getElementById("but3");
    const content1 = document.getElementById("content1");
    const content2 = document.getElementById("content2");
    const content3 = document.getElementById("content3");

    if (!button1 || !content1) return;

    function tabs(activeBtn, otherBtn1, otherBtn2, activeContent) {
        // Reset buttons
        [button1, button2, button3].forEach(btn => {
            if (btn) {
                btn.classList.remove("active");
            }
        });
        
        // Reset contents
        [content1, content2, content3].forEach(content => {
            if (content) {
                content.classList.add("hidden");
                content.classList.remove("flex");
            }
        });

        // Set active
        activeBtn.classList.add("active");
        activeContent.classList.remove("hidden");
        activeContent.classList.add("flex");
    }

    button1.addEventListener("click", () => tabs(button1, button2, button3, content1));
    button2.addEventListener("click", () => tabs(button2, button1, button3, content2));
    button3.addEventListener("click", () => tabs(button3, button1, button2, content3));
}
