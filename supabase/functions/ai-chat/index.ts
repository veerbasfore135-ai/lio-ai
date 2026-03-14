import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message }: ChatRequest = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const aiResponse = generateAIResponse(message);

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

function generateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const responses: Record<string, string> = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What can I help you with?',
    'how are you': 'I\'m doing great, thank you for asking! How can I help you today?',
    'what is your name': 'I\'m Lio A.I, your smart AI assistant. I\'m here to help answer your questions!',
    'who are you': 'I\'m Lio A.I, an artificial intelligence assistant designed to help you find answers to your questions.',
    'what can you do': 'I can help answer questions on a wide variety of topics including science, technology, history, and more. Just ask me anything!',
    'thank': 'You\'re welcome! Is there anything else I can help you with?',
    'bye': 'Goodbye! Feel free to come back anytime you have questions.',
  };

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  if (lowerMessage.includes('artificial intelligence') || lowerMessage.includes('ai')) {
    return 'Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding. AI systems use algorithms and large amounts of data to make decisions and predictions.';
  }

  if (lowerMessage.includes('quantum computing')) {
    return 'Quantum computing is a type of computing that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform operations on data. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously. This allows quantum computers to solve certain complex problems much faster than classical computers.';
  }

  if (lowerMessage.includes('internet')) {
    return 'The internet is a global network of interconnected computers that communicate using standardized protocols. It works through a system of routers, servers, and data transmission lines that allow information to travel between devices worldwide. Data is broken into packets, sent across various routes, and reassembled at the destination. The internet relies on protocols like TCP/IP to ensure reliable communication.';
  }

  if (lowerMessage.includes('machine learning')) {
    return 'Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make decisions or predictions. Common types include supervised learning, unsupervised learning, and reinforcement learning.';
  }

  if (lowerMessage.includes('blockchain')) {
    return 'Blockchain is a distributed ledger technology that records transactions across multiple computers in a way that makes the records difficult to alter retroactively. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. It\'s the technology behind cryptocurrencies like Bitcoin.';
  }

  if (lowerMessage.includes('climate change')) {
    return 'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, current changes are primarily driven by human activities, especially the burning of fossil fuels which releases greenhouse gases. This leads to global warming, rising sea levels, and extreme weather events.';
  }

  if (lowerMessage.includes('photosynthesis')) {
    return 'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose. The process uses carbon dioxide and water as raw materials and releases oxygen as a byproduct. It\'s essential for life on Earth as it produces oxygen and forms the base of most food chains.';
  }

  if (lowerMessage.includes('gravity')) {
    return 'Gravity is a fundamental force of nature that attracts objects with mass toward each other. Newton\'s law describes it as a force proportional to mass and inversely proportional to the square of the distance between objects. Einstein\'s general relativity explains gravity as the curvature of spacetime caused by mass and energy.';
  }

  return `That's an interesting question about "${message}". While I can provide basic information on many topics, I'm currently a demonstration AI with limited knowledge. For detailed and accurate information, I recommend consulting subject matter experts or authoritative sources. Is there something else I can help you with?`;
}
