# Pull Ruby image
FROM ruby:2.6.4

# Install image level deps
RUN apt-get update -yq \
  # Install deps for downloading Node.js
  && apt-get install curl gnupg -yq \
  # Get latest Node.js version
  && curl -sL https://deb.nodesource.com/setup_12.x | bash \
  # Install Node.js and Postgresql
  && apt-get install nodejs postgresql-client -yq \
  # Install Yarn
  && npm install -g yarn  \
  # Install bundler gem for downloading other gems  
  && gem install bundler \
  # Throw errors if Gemfile has been modified since Gemfile.lock
  && bundle config --global frozen 1 \
  # Remove unused Linux deps
  && rm -rf /var/lib/apt/lists/*

# Create working directory
RUN mkdir /diary

# Move Gemfile and package.jsobn files to new directory
# so we only reinstall gems and node modules if they change
COPY Gemfile Gemfile.lock package.json yarn.lock diary/

# Set working directory
WORKDIR /diary

# Install Node.js modules
RUN NODE_ENV=production yarn install \
  # Install Ruby deps
  && bundle install

# Move everything into working directory
COPY . /diary