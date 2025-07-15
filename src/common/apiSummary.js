//export const baseUrl="http://ec2-13-49-44-42.eu-north-1.compute.amazonaws.com:8081/"
export const baseUrl="http://ec2-16-171-41-109.eu-north-1.compute.amazonaws.com:8080/"



export const apiSummary={
    auth:{
      login:{
        url:"auth/login",
        method:"post"
      }
    },
    crm:{
      //leads
      getLeads:{
        url:"crm/leads",
        method:"get"
      },
      getLead:(id)=>{
        return {
          url:`crm/lead/${id}`,
          method:"get",
        }
      },
      createLead:{
        url:"crm/leads/create",
        method:"post"
      },
      deleteLead:(id)=>{
        return{
          url:`crm/leads/${id}`,
          method:"delete",
        }
      },
      //contacts
      getContacts:
      {
        url:"crm/contacts",
        method:"get"
      },
      //deals
      getDeals:
      {
        url:"crm/deals",
        method:"get"
      }
    },

}