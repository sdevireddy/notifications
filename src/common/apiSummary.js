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
       createContacts:{
        url:"crm/contacts/create",
        method:"post"
      },
      deleteContact:(id)=>{
        return {
            url:`crm/contacts/${id}`,
            method:"delete",
        }
      },
      //deals
      getDeals:
      {
        url:"crm/deals",
        method:"get"
      },
      createDeals:{
        url:"crm/deals/create",
        method:"post"
      },
      deleteDeal:(id)=>{
        return {
            url:`crm/deals/${id}`,
            method:"delete",
        }
      },
      //accounts
      getAccounts:{
        url:"crm/accounts",
        method:"get"
      },
      createAccount:{
         url:"crm/accounts/create",
        method:"post"
      }
    },

}