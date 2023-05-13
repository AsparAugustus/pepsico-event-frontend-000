import React from 'react'

const AdminDashboard = () => {

    const downloadExitSurvey = async () => {
        try {
          const response = await fetch('/api/get_exitsurvey');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'exit_survey.csv');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error(error);
        }
      };
      



  return (

    <>
  
    <div>AdminDashboard</div>


    <button onClick={(downloadExitSurvey)}>Download exit survey</button>
    </>
  )
}

export default AdminDashboard