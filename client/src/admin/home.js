/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/joy';
import { createTheme } from '@mui/material/styles';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

// components
import ContactManage from './contact/contactManage';
import PostManage from './post/postManage';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'news',
    title: 'News Management',
    icon: <NewspaperIcon />,
  },
  {
    segment: 'contact',
    title: 'Contact form records',
    icon: <ContactPageIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
    const [token] = useState(localStorage.getItem("token"))
    const [contactForms, setContactForms] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allPostsLoading, setAllPostsLoading] = useState(false);

    const [fetchDataAgain, setFetchDataAgain] = useState(Math.random());

    const getContactForms = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:8080/get-contact-forms", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
    
          if (response.ok) {
            const data = await response.json()
            setContactForms(data.data)
          } else {
            console.error("Error while fetching contact forms")
          }
          setLoading(false);
        } catch (error) {
            setLoading(false);
          console.error("Error:", error)
        }
    };

    const getAllPosts = async () => {
      setAllPostsLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:8080/all-posts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
    
          if (response.ok) {
            const data = await response.json()
            setAllPosts(data)
          } else {
            console.error("Error while fetching contact forms")
          }
          setAllPostsLoading(false);
        } catch (error) {
          setAllPostsLoading(false);
            console.error("Error:", error)
        }
    };

    useEffect(() => {
        getContactForms();
        getAllPosts();
    }, [fetchDataAgain, ]);

    const renderContent = () => {
      if (pathname === '/contact') {
          return <ContactManage contactForms={contactForms} loading={loading} />;
      }
      // Default to '/news' if pathname is anything else
      return <PostManage posts={allPosts} setFetchDataAgain={setFetchDataAgain} loading={allPostsLoading} />;
  };
  
    return (
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: 2.5
        }}
      >
        {renderContent()}
      </Box>
    );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AdminHome(props) {
    const token = localStorage.getItem('token');
    const router = useDemoRouter('/page');

    // App title
    function CustomTitle() {
        return (
            <Box sx={{ marginLeft: 2, marginTop: 0.5 }}>
                <Typography variant='h6' sx={{ color: 'black', fontWeight: 'bold'}}>
                    Marc Medics Admin Panel
                </Typography>
            </Box>
            
        );
    };


    

    return (
        // preview-start
        <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        >
        <DashboardLayout slots={{
            appTitle: CustomTitle
        }}>
            <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

export default AdminHome;
