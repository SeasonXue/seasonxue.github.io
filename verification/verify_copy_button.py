from playwright.sync_api import sync_playwright

def verify_copy_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the blog post
        page.goto("http://localhost:3000/blog/hello-world")

        # Wait for the page to load
        page.wait_for_selector("article")

        # Locate the code block group
        code_block = page.locator(".group.relative").first

        if code_block.count() == 0:
            print("No code block found!")
            browser.close()
            return

        print("Found code block")

        # Take a screenshot of the code block before hover
        # We need to ensure the button is hidden initially (opacity-0) and shown on hover.
        # However, testing hover in screenshots can be tricky.
        # Let's force hover state or just capture the area.

        code_block.hover()
        # Wait for transition
        page.wait_for_timeout(500)

        # Take screenshot of the code block with button visible
        page.screenshot(path="verification/code_block_hover.png", clip=code_block.bounding_box())

        # Click the copy button
        copy_btn = code_block.locator("button[aria-label='Copy code']")
        copy_btn.click()

        # Wait for "Copied" state (icon change)
        page.wait_for_timeout(500)

        # Take screenshot of the "Copied" state
        page.screenshot(path="verification/code_block_copied.png", clip=code_block.bounding_box())

        print("Screenshots taken")
        browser.close()

if __name__ == "__main__":
    verify_copy_button()
