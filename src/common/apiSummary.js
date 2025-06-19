export const baseUrl="http://ec2-13-49-44-42.eu-north-1.compute.amazonaws.com:8081/api"



export const apiSummary={
    login:{
        url:"/login",
        method:"post",
    },
    createLeads:{
        url:"/leads",
        method:"post"
    },
     getLeads:{
        url:"/leads",
        method:"get"
    },
     getLead:(id) => ({
    url: `/leads/${id}`,
    method: "get",
  }),

}