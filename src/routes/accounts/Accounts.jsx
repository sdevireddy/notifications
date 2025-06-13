// Accounts.jsx

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronDown, Edit, Trash2, Search, User, Phone, Mail, MoreVertical, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const accounts = [
  {
    accountId: 1,
    accountName: "Acme Corp",
    accountOwner: "John Smith",
    accountSite: "Main HQ",
    parentAccount: null,
    accountNumber: "AC123",
    accountType: "CUSTOMER",
    industry: "Technology",
    annualRevenue: 1000000,
    rating: "HOT",
    phone: "+1 (555) 123-4567",
    fax: "555-987-6543",
    website: "https://acme.com",
    tickerSymbol: "ACME",
    ownership: "PUBLIC",
    sicCode: "1234",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAccounts, setFilteredAccounts] = useState(accounts)
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [visibleColumns, setVisibleColumns] = useState({
    accountNumber: true,
    accountOwner: true,
    accountType: true,
    industry: true,
    phone: true,
    annualRevenue: true,
    rating: true,
    website: true
  })
  const navigate = useNavigate()

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    if (!term) {
      setFilteredAccounts(accounts)
    } else {
      setFilteredAccounts(
        accounts.filter(acc =>
          acc.accountName.toLowerCase().includes(term) ||
          acc.accountOwner?.toLowerCase().includes(term) ||
          acc.industry?.toLowerCase().includes(term) ||
          acc.accountNumber?.toLowerCase().includes(term)
        )
      )
    }
    setCurrentPage(1)
  }, [searchTerm])

  const recordsPerPageValue = parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(filteredAccounts.length / recordsPerPageValue)

  const sortedAccounts = useMemo(() => {
    if (!sortConfig.key) return filteredAccounts
    return [...filteredAccounts].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || ''
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || ''
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredAccounts, sortConfig])

  const currentAccounts = sortedAccounts.slice(indexOfFirstRecord, indexOfLastRecord)

  const handleSelectAll = () => {
    setSelectedAccounts(selectedAccounts.length === currentAccounts.length ? [] : currentAccounts.map(acc => acc.accountId))
  }

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your organization accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" /> Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.keys(visibleColumns).map((col) => (
                  <DropdownMenuItem key={col} onClick={() => setVisibleColumns({ ...visibleColumns, [col]: !visibleColumns[col] })}>
                    <Checkbox checked={visibleColumns[col]} className="mr-2" />
                    {col}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => navigate("/accounts/create")} className="bg-black text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b px-6 py-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search accounts..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="records-per-page" className="text-sm">Records per page:</Label>
          <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
        <Card>

          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-1 flex items-center">
                <Checkbox 
                  checked={selectedAccounts.length > 0 && selectedAccounts.length === currentAccounts.length} 
                  onCheckedChange={handleSelectAll} 
                />
              </div>
              <div className="col-span-3 cursor-pointer" onClick={() => handleSort('accountName')}>Account Name</div>
              {visibleColumns.accountOwner && <div className="col-span-2 cursor-pointer" onClick={() => handleSort('accountOwner')}>Owner</div>}
              {visibleColumns.industry && <div className="col-span-2 cursor-pointer" onClick={() => handleSort('industry')}>Industry</div>}
              {visibleColumns.accountType && <div className="col-span-2 cursor-pointer" onClick={() => handleSort('accountType')}>Type</div>}
              <div className="col-span-2 text-center">Actions</div>
            </div>
            <div className="divide-y">
              {currentAccounts.map(acc => (
                <div key={acc.accountId} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-100">
                  <div className="col-span-1 flex items-center">
                    <Checkbox 
                      checked={selectedAccounts.includes(acc.accountId)} 
                      onCheckedChange={() => {
                        setSelectedAccounts(prev =>
                          prev.includes(acc.accountId)
                            ? prev.filter(id => id !== acc.accountId)
                            : [...prev, acc.accountId]
                        )
                      }} 
                    />
                  </div>
                  <div className="col-span-3">
                    <Link to={`/accounts/profile/${acc.accountId}`} className="text-blue-600 hover:underline">
                      {acc.accountName}
                    </Link>
                    <p className="text-sm text-gray-600">{acc.accountNumber}</p>
                  </div>
                  {visibleColumns.accountOwner && <div className="col-span-2">{acc.accountOwner}</div>}
                  {visibleColumns.industry && <div className="col-span-2">{acc.industry}</div>}
                  {visibleColumns.accountType && <div className="col-span-2">{acc.accountType}</div>}
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/accounts/profile/${acc.accountId}`)}>
                          <User className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAccounts.length)} of {filteredAccounts.length}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >Previous</Button>
                <span className="text-sm">Page {currentPage} of {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                >Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}