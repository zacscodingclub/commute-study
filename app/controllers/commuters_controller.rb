class CommutersController < ApplicationController
  before_action :set_commuter, only: [:show, :edit, :update, :destroy]

  # GET /commuters
  # GET /commuters.json
  def index
    @commuters = Commuter.all
  end

  # GET /commuters/1
  # GET /commuters/1.json
  def show
  end

  # GET /commuters/new
  def new
    @commuter = Commuter.new
  end

  # GET /commuters/1/edit
  def edit
  end

  # POST /commuters
  # POST /commuters.json
  def create
    @commuter = Commuter.new(commuter_params)

    respond_to do |format|
      if @commuter.save
        format.html { redirect_to @commuter, notice: 'Commuter was successfully created.' }
        format.json { render :show, status: :created, location: @commuter }
      else
        format.html { render :new }
        format.json { render json: @commuter.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /commuters/1
  # PATCH/PUT /commuters/1.json
  def update
    respond_to do |format|
      if @commuter.update(commuter_params)
        format.html { redirect_to @commuter, notice: 'Commuter was successfully updated.' }
        format.json { render :show, status: :ok, location: @commuter }
      else
        format.html { render :edit }
        format.json { render json: @commuter.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /commuters/1
  # DELETE /commuters/1.json
  def destroy
    @commuter.destroy
    respond_to do |format|
      format.html { redirect_to commuters_url, notice: 'Commuter was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_commuter
      @commuter = Commuter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def commuter_params
      params.fetch(:commuter, {})
    end
end
