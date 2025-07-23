import { type NextRequest, NextResponse } from "next/server"

const products = [
  {
    id: "1",
    name: "Neon Streak Sneakers",
    brand: "Urban Athletics",
    serialNumber: "NS-8742",
    manufactureDate: "January 15, 2025",
    image: "/neon-streak-sneakers.png",
    description: "Limited edition sneakers with embedded NFC technology.",
    status: "authentic",
    price: "$299.99",
    materials: "Upper: Synthetic mesh, Sole: Rubber compound, Lining: Recycled polyester",
    careInstructions: "Clean with a soft brush or cloth. Air dry only. Do not machine wash.",
    blockchainHash: "0x1234567890abcdef",
    nfcChipId: "NFC-NS-8742",
    challenges: [
      {
        id: "summer-sneaker-challenge",
        name: "Summer Sneaker Challenge",
        progress: 65,
        rewards: 10000,
        description: "Wear your sneakers for 30 days to complete the challenge",
      },
    ],
    history: [
      {
        event: "Authentication",
        date: "May 2, 2025",
        location: "Urban Athletics Store, New York",
        blockchainTx: "0xabc123",
      },
      {
        event: "Ownership Transfer",
        date: "May 2, 2025",
        location: "Urban Athletics Store, New York",
        blockchainTx: "0xdef456",
      },
      {
        event: "Manufacture",
        date: "January 15, 2025",
        location: "Urban Athletics Factory, Milan",
        blockchainTx: "0x789xyz",
      },
    ],
  },
  {
    id: "2",
    name: "Designer Hoodie",
    brand: "Streetwear Co.",
    serialNumber: "DH-3921",
    manufactureDate: "February 10, 2025",
    image: "/stylish-urban-jacket.png",
    description: "Premium designer hoodie with embedded authentication technology.",
    status: "authentic",
    price: "$189.99",
    materials: "Shell: 80% Cotton, 20% Polyester, Lining: 100% Cotton",
    careInstructions: "Machine wash cold with like colors. Tumble dry low.",
    blockchainHash: "0x9876543210fedcba",
    nfcChipId: "NFC-DH-3921",
    challenges: [
      {
        id: "hoodie-rewards-program",
        name: "Hoodie Rewards Program",
        progress: 30,
        rewards: 5000,
        description: "Wear your hoodie and share on social media",
      },
    ],
    history: [
      {
        event: "Authentication",
        date: "April 15, 2025",
        location: "Streetwear Co. Online Store",
        blockchainTx: "0x111aaa",
      },
      {
        event: "Shipping",
        date: "April 12, 2025",
        location: "Streetwear Co. Distribution Center",
        blockchainTx: "0x222bbb",
      },
      {
        event: "Manufacture",
        date: "February 10, 2025",
        location: "Streetwear Co. Factory, Paris",
        blockchainTx: "0x333ccc",
      },
    ],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()

    // In a real app, this would update the database
    console.log(`Updating product ${id} with:`, updates)

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
