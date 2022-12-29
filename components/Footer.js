const navigation= [ 
    {name:'About', href: '#'},
    {name:'Jobs', href: '#'},
    {name:'Store', href: '#'},
    {name:'Terms and Conditions', href: '#'}
]
export default function Footer() {
  return (
    <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center">
                {navigation.map((item, i)=> (
                    <div key={i} className="px-6 py-2">
                        <a href= {item.href} className="text-gray-500{ hover:text-gray-900">
                            {item.name}
                            
                        </a>
                    </div>
   ) )
                }
            </nav>
            <p className="mt-8 text-center text-green-400">© 2023 UPrintI. All rights reserved. </p>
        </div> 
    </footer>
  )
}
