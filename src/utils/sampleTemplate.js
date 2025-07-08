export const sampleTemplate = {
  blocks: [
    {
      id: "sample-text-1",
      type: "text",
      content: {
        text: "<h1>Welcome to Our Newsletter!</h1>",
        fontSize: 24,
        color: "#333333",
        fontWeight: "bold",
        textAlign: "center",
      },
      styles: {
        padding: "32px 16px 16px 16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-text-2",
      type: "text",
      content: {
        text: "Hello {{name}},<br><br>Thank you for subscribing to our newsletter. We're excited to share the latest updates and insights with you.",
        fontSize: 16,
        color: "#666666",
        fontWeight: "normal",
        textAlign: "left",
      },
      styles: {
        padding: "16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-image-1",
      type: "image",
      content: {
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        alt: "Newsletter header image",
        width: "100%",
      },
      styles: {
        padding: "16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-text-3",
      type: "text",
      content: {
        text: "<h2>What's New This Week</h2><p>Here are some exciting updates we wanted to share with you:</p><ul><li>New product features launched</li><li>Upcoming webinar series</li><li>Community highlights</li></ul>",
        fontSize: 16,
        color: "#333333",
        fontWeight: "normal",
        textAlign: "left",
      },
      styles: {
        padding: "16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-button-1",
      type: "button",
      content: {
        text: "Read More",
        href: "https://example.com/newsletter",
        backgroundColor: "#007bff",
        textColor: "#ffffff",
        borderRadius: 6,
      },
      styles: {
        padding: "24px 16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-divider-1",
      type: "divider",
      content: {
        color: "#e5e5e5",
        height: 1,
      },
      styles: {
        padding: "16px",
        backgroundColor: "transparent",
      },
    },
    {
      id: "sample-text-4",
      type: "text",
      content: {
        text: 'Best regards,<br>The Newsletter Team<br><br><small>You received this email because you subscribed to our newsletter. <a href="{{unsubscribe_url}}">Unsubscribe</a></small>',
        fontSize: 14,
        color: "#888888",
        fontWeight: "normal",
        textAlign: "center",
      },
      styles: {
        padding: "16px",
        backgroundColor: "#f8f9fa",
      },
    },
  ],
};
