//export const baseUrl="http://ec2-13-49-44-42.eu-north-1.compute.amazonaws.com:8081/"
export const baseUrl="http://localhost:8081/auth"



export const apiSummary={
    login:{
        url:"/login",
        method:"post",
    },
    register:{
        url:"/createAccount",
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