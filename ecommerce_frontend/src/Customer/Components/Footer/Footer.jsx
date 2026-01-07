import React, { Component } from 'react';
import { Typography, Button } from '@mui/material';

class Footer extends Component {
    render() {
        return (
            <div className="bg-black text-white py-12 mt-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {/* Company Section */}
                        <div>
                            <Typography variant="h6" className="pb-2">Company</Typography>
                            <div>
                                <Button variant="text" className="pb-1">About</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Blog</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Press</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Jobs</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Partner</Button>
                            </div>
                        </div>

                        {/* Solutions Section */}
                        <div>
                            <Typography variant="h6" className="pb-2">Solutions</Typography>
                            <div>
                                <Button variant="text" className="pb-1">Marketing</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Analytics</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Commerce</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Insight</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Support</Button>
                            </div>
                        </div>

                        {/* Documentation Section */}
                        <div>
                            <Typography variant="h6" className="pb-2">Documentation</Typography>
                            <div>
                                <Button variant="text" className="pb-1">Guides</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">API Status</Button>
                            </div>
                        </div>

                        {/* Legal Section */}
                        <div>
                            <Typography variant="h6" className="pb-2">Legal</Typography>
                            <div>
                                <Button variant="text" className="pb-1">Claims</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Privacy</Button>
                            </div>
                            <div>
                                <Button variant="text" className="pb-1">Terms</Button>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="pt-6 text-center">
                        <Typography component="p" sx={{ fontSize: '14px' }}>
                            &copy; 2025 My Company. All Rights Reserved.
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;

