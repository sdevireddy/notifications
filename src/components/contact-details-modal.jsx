"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Building, Calendar, Tag, Activity, FileText, DollarSign, Clock, Edit } from "lucide-react"

export function ContactDetailsModal({ contact, isOpen, onClose }) {
  if (!contact) return null

  const activities = [
    { type: "Email", description: "Sent proposal document", date: "2024-01-15", time: "10:30 AM" },
    { type: "Call", description: "Follow-up call regarding pricing", date: "2024-01-12", time: "2:15 PM" },
    { type: "Meeting", description: "Product demo session", date: "2024-01-10", time: "11:00 AM" },
  ]

  const deals = [
    { name: "Q1 Software License", value: "$25,000", stage: "Proposal", probability: "75%" },
    { name: "Consulting Services", value: "$15,000", stage: "Negotiation", probability: "60%" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{contact.name}</h2>
              <p className="text-gray-600">
                {contact.jobTitle} at {contact.company}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>{contact.company}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Last Contact: {contact.lastContactDate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Status & Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Status & Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Status</p>
                    <Badge
                      variant={
                        contact.status === "active"
                          ? "default"
                          : contact.status === "prospect"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        contact.status === "active"
                          ? "bg-green-100 text-green-800"
                          : contact.status === "prospect"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      }
                    >
                      {contact.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{activity.type}</Badge>
                          <span className="text-sm text-gray-500">
                            {activity.date} at {activity.time}
                          </span>
                        </div>
                        <p className="text-gray-900">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Associated Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.map((deal, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{deal.name}</h4>
                        <span className="font-semibold text-green-600">{deal.value}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Stage: {deal.stage}</span>
                        <span>Probability: {deal.probability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes & Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">January 15, 2024</p>
                    <p>
                      Very interested in our enterprise solution. Mentioned they're looking to scale their operations in
                      Q2.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">January 10, 2024</p>
                    <p>Great product demo session. They were particularly impressed with the analytics dashboard.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
